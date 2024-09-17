import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY;

const authChecker = (req, res, next) => {
    // Checking whether cookies exist
    if (!req.cookies) return res.status(400).json({ message: 'No cookies found in request' });

    const token = req.cookies.token; // Extracting token from cookies

    if (token == null) return res.status(401).json({ message: 'No token provided, please sign in' });

    jwt.verify(token, JWT_SECRET, async(err, user) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });
        req.user = user;
        //console.log(user);
        next();
    });
};

export default authChecker;
