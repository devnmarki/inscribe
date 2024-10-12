import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:user_id', getUser);
router.put('/users/:user_id', updateUser);
router.delete('/users/:user_id', deleteUser);

export default router;