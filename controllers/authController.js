import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const secret = process.env.SECRET_KEY;

export const signup = async (req, res) => {
    const { username, password, API_KEY } = req.body;
    let role = "user";
    
    if (API_KEY && API_KEY === process.env.ADMIN_SECRET) {
        role = "admin";
    }

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const check = await db.query('select id from users where username = $1', [username]);
        if (check.rows.length !== 0) {
            return res.status(409).json({ message: "User already exists! Please Sign In." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'insert into users (username, password, role) values ($1, $2, $3) returning id',
            [username, hashedPassword, role]
        );
        const userId = result.rows[0].id;
        res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const result = await db.query('select id, password, role from users where username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: `Welcome ${user.role.toUpperCase()}!` });
    } catch (error) {
        console.error('Sign-in error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logout successful!' });
};
