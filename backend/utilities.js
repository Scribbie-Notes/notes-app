const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const { ACCESS_TOKEN_SECRET } = process.env;


const authenticationToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


module.exports = authenticationToken ;
