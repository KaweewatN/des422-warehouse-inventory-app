import sql from "../utils/supabase.js";
import supabase from "../utils/supabaseClient.js";

const ItemsController = {
  async AllItems(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
      const totalResult = await sql`SELECT COUNT(*) FROM items`;
      console.log(totalResult);
      const total = parseInt(totalResult[0].count);
      const pages = Math.ceil(total / limit);

      const items = await sql`
                SELECT 
                    i.item_id,
                    i.item_name,
                    i.quantity,
                    i.description,
                    i.item_image,
                    i.sku,
                    it.type_name AS item_type,
                    u.uname AS created_by
                FROM items i
                LEFT JOIN items_types it ON i.item_type_id = it.item_type_id
                LEFT JOIN users u ON i.created_by = u.user_id
                WHERE i.is_deleted = FALSE
                ORDER BY i.item_id
                LIMIT ${limit} OFFSET ${offset}
            `;
      return res.status(200).json({page, limit, total, pages, items});
    } catch (err) {
      console.error("Fetch items error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async OneItems(req, res) {
    const {item_id} = req.params;
    try {
      const items = await sql`
                SELECT 
                i.item_id,
                i.item_name,
                i.quantity,
                i.description,
                i.item_image,
                i.sku,
                it.type_name AS item_type,
                u.uname AS created_by
                FROM items i
                LEFT JOIN items_types it ON i.item_type_id = it.item_type_id
                LEFT JOIN users u ON i.created_by = u.user_id
                WHERE i.item_id = ${item_id} AND i.is_deleted = FALSE
            `;

      if (items.length === 0) {
        return res.status(204).json({error: "Item not found"});
      }

      return res.status(200).json({items: items[0]});
    } catch (err) {
      console.error("Fetch items error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async Withdrawal(req, res) {
    const {item_id, quantity} = req.body;
    const user_id = req.user.id;
    try {
      if (!user_id || !item_id || !quantity) {
        return res.status(400).json({error: "user_id, item_id, and quantity are required."});
      }

      const item_quantity = await sql`
                SELECT quantity FROM items WHERE item_id = ${item_id} AND is_deleted = FALSE`;

      if (item_quantity.length === 0 || item_quantity[0].quantity === 0) {
        return res.status(204).json({error: "Item not found or out of stock"});
      }

      const current_quantity = item_quantity[0].quantity;

      if (quantity > current_quantity) {
        return res.status(400).json({error: "Not enough quantity available."});
      }

      const result = await sql.begin(async (sql) => {
        await sql`
                    UPDATE items
                    SET quantity = quantity - ${quantity}
                    WHERE item_id = ${item_id}
                `;

        const withdrawal = await sql`
                    INSERT INTO withdrawal (
                        item_id,
                        user_id,
                        quantity
                    ) VALUES (
                        ${item_id},
                        ${user_id},
                        ${quantity}
                    )
                    RETURNING item_id, user_id, quantity
                `;
        return withdrawal[0];
      });

      return res.status(201).json({
        message: "Withdrawal successful",
        withdrawal: result,
      });
    } catch (err) {
      console.error("Withdrawal error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async UpdateItemsQuantity(req, res) {
    const {item_id} = req.params;
    const {quantity} = req.body;
    try {
      if (!quantity || quantity <= 0) {
        return res.status(400).json({error: "Quantity is required and must be greater than 0"});
      }

      const item = await sql`
                SELECT * FROM items WHERE item_id = ${item_id} AND is_deleted = FALSE`;
      if (item.length === 0) {
        return res.status(204).json({error: "Item not found"});
      }

      const current_quantity = item[0].quantity;

      if (current_quantity + quantity > 100) {
        return res.status(400).json({error: "Quantity cannot be more than 100"});
      }

      const updated = await sql`
                UPDATE items
                SET quantity = quantity + ${quantity}
                WHERE item_id = ${item_id}
                RETURNING *
            `;

      return res.status(200).json({
        message: "Quantity added successfully.",
        item: updated[0],
      });
    } catch (err) {
      console.error("Add items error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async SoftDeleteItem(req, res) {
    const {item_id} = req.params;
    try {
      const item = await sql`
                SELECT * FROM items WHERE item_id = ${item_id} AND is_deleted = FALSE
            `;
      if (item.length === 0) {
        return res.status(404).json({error: "Item not found or already deleted."});
      }

      await sql`
                UPDATE items
                SET is_deleted = TRUE
                WHERE item_id = ${item_id}
            `;

      return res.status(200).json({message: "Item soft deleted successfully"});
    } catch (err) {
      console.error("Delete item error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async AddItem(req, res) {
    const {item_type_id, item_name, sku, quantity, description} = req.body;
    const file = req.file;
    const user_id = req.user.id;
    // console.log(user_id)
    // console.log('BODY:', req.body);
    // console.log('FILE:', req.file);
    try {
      if (!file) {
        return res.status(400).json({error: "Image is required."});
      }

      if (!item_name || !description || !quantity || !item_type_id || !sku) {
        return res.status(400).json({error: "All fields are required."});
      }
      const existing = await sql`
            SELECT * FROM items WHERE item_name = ${item_name} OR sku = ${sku}`;
      if (existing.length > 0) {
        return res.status(409).json({error: "Item name or SKU already exists."});
      }

      const filePath = file.originalname.replace(/\s+/g, "_");

      const {error: uploadError} = await supabase.storage
        .from("picture")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload failed:", uploadError.message);
        return res.status(500).json({error: "Image upload failed."});
      }
      const publicUrl = `${process.env.SUPABASE_URL}.supabase.co/storage/v1/object/public/picture/${filePath}`;

      const inserted = await sql`
                INSERT INTO items (item_type_id, item_name, sku, quantity, description, item_image, created_by)
                VALUES (${item_type_id},${item_name}, ${sku}, ${quantity}, ${description}, ${publicUrl},${user_id})
                RETURNING item_id, item_type_id, item_name, sku, quantity, description, item_image, created_by
            `;

      return res.status(201).json({
        message: "Item added successfully.",
        item: inserted[0],
      });
    } catch (err) {
      console.error("Add item error:", err);
      try {
        await supabase.storage.from("picture").remove([filePath]);
        console.log(`Rolled back image: ${filePath}`);
      } catch (deleteErr) {
        console.error("Failed to rollback uploaded image:", deleteErr.message);
      }
      res.status(500).json({error: "Server error"});
    }
  },
  async SearchItems(req, res) {
    const {name} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      if (!name) {
        return res.status(400).json({error: "Item name is required for search."});
      }

      const totalResult = await sql`
                SELECT COUNT(*) FROM items
                WHERE is_deleted = FALSE AND LOWER(item_name) LIKE LOWER(${`%${name}%`})
            `;
      const total = parseInt(totalResult[0].count);
      const pages = Math.ceil(total / limit);

      const items = await sql`
                SELECT 
                    i.item_id,
                    i.item_name,
                    i.quantity,
                    i.description,
                    i.item_image,
                    i.sku,
                    it.type_name AS item_type,
                    u.uname AS created_by
                FROM items i
                LEFT JOIN items_types it ON i.item_type_id = it.item_type_id
                LEFT JOIN users u ON i.created_by = u.user_id
                WHERE i.is_deleted = FALSE
                  AND LOWER(i.item_name) LIKE LOWER(${`%${name}%`})
                ORDER BY i.item_id
                LIMIT ${limit} OFFSET ${offset}
            `;

      return res.status(200).json({
        page,
        limit,
        total,
        pages,
        items,
      });
    } catch (err) {
      console.error("Search item error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async SearchItemsByCategory(req, res) {
    const {category} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const categoryId = parseInt(category);

      if (!categoryId || isNaN(categoryId)) {
        return res.status(400).json({error: "Category ID must be a valid number."});
      }

      const totalResult = await sql`
                SELECT COUNT(*) FROM items
                WHERE is_deleted = FALSE AND item_type_id = ${categoryId}`;
      const total = parseInt(totalResult[0].count);
      const pages = Math.ceil(total / limit);

      const items = await sql`
                SELECT 
                    i.item_id,
                    i.item_name,
                    i.quantity,
                    i.description,
                    i.item_image,
                    i.sku,
                    it.type_name AS item_type,
                    u.uname AS created_by
                FROM items i
                LEFT JOIN items_types it ON i.item_type_id = it.item_type_id
                LEFT JOIN users u ON i.created_by = u.user_id
                WHERE i.is_deleted = FALSE AND i.item_type_id = ${categoryId}
                ORDER BY i.item_id
                LIMIT ${limit} OFFSET ${offset}
            `;

      return res.status(200).json({
        page,
        limit,
        total,
        pages,
        items,
      });
    } catch (err) {
      console.error("Search by category ID error:", err);
      res.status(500).json({error: "Server error"});
    }
  },

  async GetItemTypes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Get the total number of item types
      const totalResult = await sql`
        SELECT COUNT(*) AS total FROM items_types
      `;
      const total = parseInt(totalResult[0].total);

      // Get item types with the count of items in each type
      const types = await sql`
        SELECT 
          it.item_type_id, 
          it.type_name, 
          COUNT(i.item_id)::INTEGER AS item_count
        FROM items_types it
        LEFT JOIN items i ON it.item_type_id = i.item_type_id
        GROUP BY it.item_type_id, it.type_name
        ORDER BY it.item_type_id
        LIMIT ${limit} OFFSET ${offset}
      `;

      const pages = Math.ceil(total / limit);

      return res.status(200).json({
        page,
        limit,
        total,
        pages,
        types: types,
      });
    } catch (err) {
      console.error("Fetch item types error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async EditItemDetails(req, res) {
    const {item_id} = req.params;
    const {item_type_id, item_name, sku, quantity, description} = req.body;
    const file = req.file;

    try {
      if (!item_name || !sku || !quantity || !description || !item_type_id) {
        return res.status(400).json({error: "All fields are required."});
      }

      const existing = await sql`
            SELECT * FROM items WHERE item_id = ${item_id} AND is_deleted = FALSE
          `;
      if (existing.length === 0) {
        return res.status(404).json({error: "Item not found."});
      }

      const currentItem = existing[0];

      const duplicates = await sql`
            SELECT * FROM items 
            WHERE (item_name = ${item_name} OR sku = ${sku}) 
            AND item_id != ${item_id}`;
      if (duplicates.length > 0) {
        return res.status(409).json({error: "Item name or SKU already exists for another item."});
      }

      let publicUrl = currentItem.item_image;

      if (file) {
        const filePath = file.originalname.replace(/\s+/g, "_");

        const oldPath = currentItem.item_image?.split("/storage/v1/object/public/picture/")[1];
        if (oldPath) {
          await supabase.storage.from("picture").remove([oldPath]);
        }

        const {error: uploadError} = await supabase.storage
          .from("picture")
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload failed:", uploadError.message);
          return res.status(500).json({error: "Image upload failed."});
        }

        publicUrl = `${process.env.SUPABASE_URL}.supabase.co/storage/v1/object/public/picture/${filePath}`;
      }

      const updated = await sql`
            UPDATE items
            SET 
              item_type_id = ${item_type_id},
              item_name = ${item_name},
              sku = ${sku},
              quantity = ${quantity},
              description = ${description},
              item_image = ${publicUrl}
            WHERE item_id = ${item_id}
            RETURNING item_name,sku`;

      return res.status(200).json({
        message: "Item updated successfully.",
        item: updated[0],
      });
    } catch (err) {
      console.error("Edit item error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
};

export default ItemsController;
