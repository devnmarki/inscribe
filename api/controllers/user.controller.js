import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error in get users!" });
    }
}

export const getUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(404).json({ message: "User not found!" });
    }
}

export const updateUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: "User updated!", data: user });
    } catch (e) {
        console.error(e);
        res.status(404).json({ message: "User not found!" });
    }
}

export const deleteUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await User.findByIdAndDelete(user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: "User deleted successfully!", data: user });
    } catch (e) {
        console.error(e);
    }
}