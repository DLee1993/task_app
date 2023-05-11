import { User } from "../model/Users.js";
import bcrypt from "bcrypt";

//- Get All Users
export const getAllUsers = async (req, res) => {
    const users = await User.find({}).select("-password");

    //- no users?
    if (!users) {
        return res.status(400).json({ message: "No Users found" });
    }

    res.json(users);
};

//- create a new user
export const createUser = async (req, res) => {
    const { username, password } = req.body;

    //- confirm data
    if (!username || !password) {
        return res.status(400).json({ message: "All Fields required" });
    }

    //- check for existing user with same data
    const duplicate = await User.findOne({ username });

    if (duplicate) {
        return res.status(409).json({ message: "username already exists" });
    }

    //- hash the password
    const hashpwd = await bcrypt.hash(password, 10);

    //- create new user
    const userObject = { username, password: hashpwd };

    const user = await User.create(userObject);

    if (user) {
        //created
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
};
