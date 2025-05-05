import sql from "../utils/supabase.js";

const AdminController = {
  async GetAllWithdrawals(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const totalResult = await sql`
        SELECT COUNT(*) FROM withdrawal
      `;
      const total = parseInt(totalResult[0].count);
      const pages = Math.ceil(total / limit);

      const withdrawals = await sql`
        SELECT 
          w.withdraw_id,
          w.item_id,
          i.item_name,
          w.user_id,
          u.uname AS withdrawn_by,
          w.quantity,
          w.created_at
        FROM withdrawal w
        LEFT JOIN items i ON w.item_id = i.item_id
        LEFT JOIN users u ON w.user_id = u.user_id
        ORDER BY w.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;

      return res.status(200).json({
        page,
        limit,
        total,
        pages,
        withdrawals,
      });
    } catch (err) {
      console.error("Get withdrawals error:", err);
      res.status(500).json({error: "Server error"});
    }
  },

  async GetAdminSummary(req, res) {
    try {
      const totalUsers = await sql`SELECT COUNT(*) FROM users`;
      const totalItems = await sql`SELECT COUNT(*) FROM items`;
      const totalItemTypes = await sql`SELECT COUNT(*) FROM items_types`;
      const totalWithdrawals = await sql`SELECT COUNT(*) FROM withdrawal`;

      return res.status(200).json({
        message: "Admin summary fetched successfully",
        data: {
          totalUsers: parseInt(totalUsers[0].count),
          totalItems: parseInt(totalItems[0].count),
          totalItemTypes: parseInt(totalItemTypes[0].count),
          totalWithdrawals: parseInt(totalWithdrawals[0].count),
        },
      });
    } catch (err) {
      console.error("Get admin summary error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
};

export default AdminController;
