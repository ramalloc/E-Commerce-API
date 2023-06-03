const jwt = require('jsonwebtoken');

// If user wants to update something then We have to verifying users by their ids and passwords and also with JWT.

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; // We used Bearer in token thererfore we are putting a space before token. 
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(401).json("Token is not Valid !");
            req.user = user;
            next(); // Here next means if token is valid then process will move to the routes
        });
    }
    else {
        return res.status(401).json("You are not auhtenticated !");
    }
};

// This verify Token and  Users on not Admin
const verifyTokenAndAutharization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next(); // If entered id is correct then it will route the page. 
        }
        else {
            res.status(403).json("You are not allowed to this !");
        }
    });
};

// To verify Token and Admin
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next(); // If entered id is correct then it will route the page. 
        }
        else {
            res.status(403).json("You are not allowed to this !");
        }
    });
};


// DONE 


module.exports = {verifyToken, verifyTokenAndAutharization, verifyTokenAndAdmin}; // We have exported in {} beacause it created more functions in this 