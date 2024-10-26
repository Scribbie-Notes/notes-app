const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;


if (!ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
}

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        return res.status(403).json({ message: "No authorization header provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token verification failed" });
        }
        
        req.user = user;
        next();
    });
};


module.exports = authenticationToken ;
