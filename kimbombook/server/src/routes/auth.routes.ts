import { Router } from 'express';
import { loginHandler, profileHandler, signupHandler } from '../controllers/auth.controller';
import requireAuth   from '../middlewares/requireAuth'

const router = Router()

router.post('/register', signupHandler)
router.post('/login', loginHandler)
router.get('/profile', requireAuth, profileHandler)

export default router