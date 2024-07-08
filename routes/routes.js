import { Router } from 'express';
import { registerUser, loginUser, getUser } from '../controller/controller.js';
import { verifyToken, checkCredentials } from '../middleware/middleware.js';

const router = Router();

router.post('/usuarios', checkCredentials, registerUser);
router.post('/login', checkCredentials, loginUser);
router.get('/usuarios', verifyToken, getUser);

export default router;