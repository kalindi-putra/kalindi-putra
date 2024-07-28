const jwt=require('jsonwebtoken')




function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(403).json({ message: 'Token not provided' });

    jwt.verify(token, '123456789', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
        req.charityId = decoded.id;
        next();
    });
}


module.exports=verifyToken
