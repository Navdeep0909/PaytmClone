const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    // console.log("..................................................")
    const token = authHeader.split(' ')[1];
    // console.log(token)

    try{
        console.log("----------------------------Inside the try block----------------------------")
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded)

        req.userId = decoded.userId;

        next();
    }catch(err){
        console.log("----------------------------Inside the catch block----------------------------")
        return res.status(403).json({err});

    }

}

module.exports = {
    authMiddleware
}