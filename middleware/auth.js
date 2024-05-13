const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function auth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthenticated, you must log in' });
    }

    try {
      
        const decoded = await promisify(jwt.verify)(authorization, 'JWT_SECRET=this_is_my_jwt_secret_in_my_project');
      
        req.id= decoded.data.id;
        req.role=decoded.data.role;
        next(); 
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports={auth}