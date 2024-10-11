import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const handleErrors = (err) => {
    console.log(err.message, err.code);
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });
};

export const signup = async (req, res) => {
    const { name, email, password, profile_image } = req.body;

    try {
        const user = await User.create({ name, email, password, profile_image });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (e) {
        console.error(e);
        handleErrors(e);
        res.status(400).send("error, user not created");
    }
} 

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
    } catch (e) {
        console.error(e);
        res.status(400).json({});
    }
}

export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
}