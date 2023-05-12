import { User } from "../model/Users.js";
import { Task } from "../model/Tasks.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

//- Get All Users
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password").lean();

    //- no users?
    if (!users?.length) {
        return res.status(400).json({ message: "No Users found" });
    }

    res.json(users);
});

//- create a new user
export const createUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    //- confirm data
    if (!username || !password) {
        return res.status(400).json({ message: "All Fields required" });
    }

    //- check for existing user with same data
    const duplicate = await User.findOne({ username }).lean().exec();

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
        res.status(201).json({ message: `New user created` });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
});

//- update a user
export const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password } = req.body;

    if (!id || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(400).json({ message: "User not found" });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    user.username = username;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} has been successfully updated` });
});

//- delete a user
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "User ID is required" });
    }

    const task = await Task.findOne({ user: id }).lean().exec();

    if (task) {
        return res.status(400).json({ message: "User has tasks!" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const result = await user.deleteOne();

    res.status(200).json({ name: result.username, id: result.id, status: "Deleted" });
});
