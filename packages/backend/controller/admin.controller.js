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
};

export default AdminController;
