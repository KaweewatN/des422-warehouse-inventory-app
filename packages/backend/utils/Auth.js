import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        return res.status(401).send('Token is not valid'); 
    }
};

export const Role = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: Insufficient role' });
        }
        next();
    };
};
