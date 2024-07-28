const jwt=require('jsonwebtoken')




function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(403).json({ error: 'Token not provided' });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Failed to authenticate token' });
        req.userId = decoded.email;
        next();
    });
}


module.exports=verifyToken
