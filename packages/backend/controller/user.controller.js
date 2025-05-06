import sql from "../utils/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserController = {
  async SignUp(req, res) {
    const {fname, lname, phone, uname, password, role = "user"} = req.body;
    try {
      if (!uname || !password || !fname || !lname || !phone) {
        return res.status(400).json({
          error: "Please fill in all fields.",
        });
      }

      if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          error: "Phone number must be exactly 10 digits.",
        });
      }

      const existing = await sql`
            SELECT uname, phone FROM users
            WHERE uname = ${uname} OR phone = ${phone}`;
      // console.log(existing);

      if (existing.length > 0) {
        return res.status(409).json({
          error: "Username or phone number already exists.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await sql`
                INSERT INTO users (
                    uname, fname, lname, phone, password, role
                ) VALUES (
                    ${uname}, ${fname}, ${lname}, ${phone}, ${hashedPassword}, ${role}
                )
                RETURNING *
            `;

      res.status(201).json({
        message: "User created successfully",
        user: result[0],
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
  async LogIn(req, res) {
    const {uname, password} = req.body;
    try {
      if (!uname || !password) {
        return res.status(400).json({
          error: "Username and password are required",
        });
      }

      const existing_user = await sql`
                SELECT user_id, uname, password,role FROM users
                WHERE uname = ${uname}`;

      if (existing_user.length === 0) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const user = existing_user[0];

      console.log(user.role);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          error: "Password do not match",
        });
      }

      const token = jwt.sign(
        {id: user.user_id, username: uname, role: user.role},
        process.env.SUPABASE_JWT_SECRET,
        {expiresIn: "3h"},
      );

      return res.status(200).json({
        token,
        user: {
          uname: user.uname,
          id: user.user_id,
          role: user.role,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({error: "Server error"});
    }
  },
  async UserInfo(req, res) {
    const user_id = req.user.id;
    try {
      const user_info_result = await sql`
            SELECT user_id, uname, fname, lname FROM users
            WHERE user_id = ${user_id}`;

      if (user_info_result.length === 0) {
        return res.status(400).json({
          error: "User not found.",
        });
      }

      const user_info = user_info_result[0];

      return res.status(200).json({user: user_info});
    } catch (err) {
      console.error("Fetch user info error:", err);
      return res.status(500).json({error: "Server error"});
    }
  },
  async UserWithdrawalHistory(req, res) {
    const user_id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const totalResult = await sql`
            SELECT COUNT(*) FROM withdrawal WHERE user_id = ${user_id}`;
      const total = parseInt(totalResult[0].count);
      const pages = Math.ceil(total / limit);

      const history = await sql`
            SELECT 
              w.withdraw_id,
              w.item_id,
              i.item_name,
              w.quantity,
              w.created_at
            FROM withdrawal w
            LEFT JOIN items i ON w.item_id = i.item_id
            WHERE w.user_id = ${user_id}
            ORDER BY w.created_at DESC
            LIMIT ${limit} OFFSET ${offset}`;

      return res.status(200).json({
        page,
        limit,
        total,
        pages,
        history,
      });
    } catch (err) {
      console.error("User withdrawal history error:", err);
      res.status(500).json({error: "Server error"});
    }
  },

  async ListAllUsers(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const totalResult = await sql`
        SELECT COUNT(*) FROM users`;
      const total = parseInt(totalResult[0].count);
      const pages = Math.ceil(total / limit);

      // Fetch paginated users
      const users = await sql`
        SELECT user_id, uname, fname, lname, phone, role
        FROM users
        ORDER BY user_id ASC
        LIMIT ${limit} OFFSET ${offset}`;

      return res.status(200).json({
        page,
        limit,
        total,
        pages,
        users,
      });
    } catch (err) {
      console.error("List all users error:", err);
      res.status(500).json({error: "Server error"});
    }
  },
};

export default UserController;
