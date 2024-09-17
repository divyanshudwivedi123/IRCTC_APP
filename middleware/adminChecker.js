import db from '../config/db.js';


// Middleware to check if the user is an admin
const adminChecker = async(req, res, next) => {
    //console.log(req.user);
    const result = await db.query('select role from users where id = $1', [req.user.userId]);
    //console.log(result);
    if (result.rows[0].role === 'admin') {
        return next(); 
    } else {
        return res.status(403).json({ message: 'Admin access required' }); 
    }
};

export default adminChecker;
