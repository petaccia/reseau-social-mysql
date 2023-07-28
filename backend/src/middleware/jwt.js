const jwt = require('jsonwebtoken');



const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('------------------>authHeader', authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('------------------>token', token);
        jwt.verify(token, process.env.DB_ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log('------------------>err', err);
                return res.sendStatus(403);
            }
            req.user = user;
            console.log('------------------>req.user', req.user);
            next(); 
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;