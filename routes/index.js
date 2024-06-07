import express from 'express'
import { login } from '../controllers/UserController.js'
import { getSession } from '../controllers/SessionController.js'
import { getToken } from '../controllers/TokenController.js'

const router = express.Router()

router.post('/v1/login', login)
router.get('/v1/session', getSession)
router.get('/v1/token', getToken)
// router.get('v1/verifytoken', verifyToken)

export default router