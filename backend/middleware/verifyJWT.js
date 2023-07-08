import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    //- check for authorization header - [ The HTTP Authorization request header can be used to provide credentials that authenticate a user agent with a server ]
    const authHeader = req.headers.authorization || req.headers.Authorization;

    //- if theres no auth header that starts with bearer, return message
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //- if all is ok, get the token from authorization header bearer
    const token = authHeader.split(" ")[1];

    //- verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        //- if theres an error, send message back
        if (err) return res.status(403).json({ message: "Forbidden" });

        //- if no error, get the user
        req.user = decoded.UserInfo.username;

        //- continue - [call next middleware or move on to next controller, basically continue running the rest of the code]
        next();
    });
};
