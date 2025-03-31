import sql from '../utils/supabase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserController = {
    async SignUp(req, res) {
        try {
            const { fname,lname, phone, uname, password, role = 'user' } = req.body;

            if (!uname || !password || !fname || !lname || !phone) {
                return res.status(400).json({
                    error: 'Name and password are required.'
                });
            }

            if (phone.length !== 10) {
                return res.status(400).json({
                    error : 'Phone number must be 10 digits.'
                });
            }

            const existing = await sql`
            SELECT uname, phone FROM users
            WHERE uname = ${uname} OR phone = ${phone}`;
            // console.log(existing);

        if (existing.length > 0) {
            return res.status(409).json({
                error: 'Username or phone number already exists.'
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
                message: 'User created successfully',
                user: result[0]
            });
        } catch (err) {
            console.error('Signup error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    },
    async LogIn(req, res) {
        try {
            const { uname, password } = req.body;

            const existing_user = await sql`
                SELECT user_id, uname, password FROM users
                WHERE uname = ${uname}`;

            if (existing_user.length === 0) {
                return res.status(400).json({
                    error: 'User not found.'
                });
            }

            const user = existing_user[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    error: 'Invalid password.'
                });
            }

            const token = jwt.sign(
                { id: user.user_id, username: uname },
                process.env.SUPABASE_JWT_SECRET,
                { expiresIn: '3h' }
            );

            return res.status(200).json({ token });

        } catch (err) {
            console.error('Login error:', err);
            return res.status(500).json({ error: 'Server error' });
        }
    },
    async UserInfo(req, res) {
        try {
            const user_id = req.user.id;

            const user_info_result = await sql`
            SELECT user_id, uname, fname, lname FROM users
            WHERE user_id = ${user_id}`;

            if (user_info_result.length === 0) {
                return res.status(400).json({
                    error: 'User not found.'
                });
            }
            
            const user_info = user_info_result[0];

            return res.status(200).json({ user: user_info });
        } catch (err) {
            console.error('Fetch user info error:', err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};


export default UserController;
