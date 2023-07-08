import { User } from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//- Login - [ POST - /auth ] - Public access
export const login = async (req, res) => {
    //- destructure username and password from request
    const { username, password } = req.body;

    //- if no username of password send message back
    if (!username || !password) {
        return res.status(400).json({ message: "All Fields required" });
    }

    //- find the user based on the username in the request
    const foundUser = await User.findOne({ username }).exec();

    //- if no user found send back message
    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //- check to see if the password in the request matches the stored password for the user
    const match = await bcrypt.compare(password, foundUser.password);

    //- if no match send back message
    if (!match) return res.status(401).json({ message: "Unauthorized" });

    //- create the access token
    const accessToken = jwt.sign(
        {
            UserInfo: {
                username: foundUser.username,
            },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
    );

    //- create the refresh token
    const refreshToken = jwt.sign(
        {
            username: foundUser.username,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "7d" }
    );

    //- create cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true, //- only able to access be web server
        secure: true, //- https
        sameSite: "None", //- cross site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //- cookie expiry set to 24hrs
    });

    res.json({ accessToken });
};

//- Refresh - [ GET - /auth/refresh ] - Public access as token has expired
export const refresh = (req, res) => {
    //- get the cookies
    const cookies = req.cookies;

    //- if there is no cookie send message back
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    //- use jwt to verify the token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
        //- if theres an error send back message
        if (err) return res.status(403).json({ message: "Forbidden" });

        //- find the user
        const foundUser = await User.findOne({ username: decoded.username });

        //- if no user send message back
        if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

        //- if there is a user, create new access token
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                },
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        res.json({ accessToken });
    });
};

//- Logout - [ POST - /auth/logout ] - Public access - Clear cookie if it exists
export const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie Cleared" });
};
