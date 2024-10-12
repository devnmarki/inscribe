import Folder from "../models/folder.model.js";
import User from "../models/user.model.js";

export const getFolders = async (req, res) => {
    const { user_id } = req.params;
    
    try {

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const folders = await Folder.find({ user_id });

        res.status(200).json(folders);

    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
}

export const getFolder = async (req, res) => {
    const { folder_id } = req.params;

    try {

        const folder = await Folder.findById(folder_id);
        if (!folder) {
            return res.status(404).send("Folder not found");
        }

        res.status(200).json(folder);

    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
}

export const createFolder = async (req, res) => {
    const { user_id } = req.params;

    const folderData = req.body;
    
    try {

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const folder = new Folder({
            ...folderData,
            user_id
        });

        await folder.save();
        res.status(201).json({ message: "Folder created successfully!", data: folder });

    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
}

export const updateFolder = async (req, res) => {
    const { folder_id } = req.params;

    const newFolderData = req.body;

    try {

        const updatedFolder = await Folder.findByIdAndUpdate(folder_id, newFolderData, { new: true});
        res.status(200).json({ success: true, data: updatedFolder });

    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
}

export const deleteFolder = async (req, res) => {
    const { folder_id } = req.params;

    try {

        const deletedFolder = await Folder.findByIdAndDelete(folder_id);
        res.status(200).json({ success: true, data: deletedFolder });

    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
}