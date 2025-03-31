import sql from '../utils/supabase.js';
import bcrypt from 'bcrypt';

const UserController = {
    async SignUp(req, res) {
        const { uname, password, role = 'user' } = req.body;

        if (!uname || !password) {
            return res.status(400).json({
                error: 'Name and password are required.'
            });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await sql`
                INSERT INTO users (
                    uname, password, role
                ) VALUES (
                    ${uname}, ${hashedPassword}, ${role}
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
    }
};

export default UserController;
