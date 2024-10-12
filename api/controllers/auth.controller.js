import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const handleErrors = (err) => {
    let errors = { name: '', email: '', password: '' };

    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            if (properties && properties.path && errors[properties.path] !== undefined) {
                errors[properties.path] = properties.message;
            }
        });
    }

    return errors;
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
        const errors = handleErrors(e);
        res.status(400).json({ errors });
    }
} 

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt; // Access the cookie containing the JWT

    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if (err) {
                console.error(err);
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                req.user = decodedToken; // Attach decoded user information to the request
                next(); // Proceed to the next middleware or route handler
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        if (user && user._id) {
            // Create a token if the user is found and authenticated
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id });
        } else {
            // If login fails, respond with an error
            res.status(400).json({ error: 'Invalid email or password' });
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: 'Invalid email or password' });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Use the user ID from the decoded token
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
}