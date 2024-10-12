import express from "express";
import { createFolder, getFolders, getFolder, updateFolder, deleteFolder } from "../controllers/folder.controller.js";

const router = express.Router();

router.get('/users/:user_id/folders', getFolders);
router.get('/folders/:folder_id', getFolder);
router.post('/users/:user_id/folders', createFolder);
router.put('/folders/:folder_id', updateFolder);
router.delete('/folders/:folder_id', deleteFolder);

export default router;