import { Router } from 'express'
const router = Router()
import { Response, Request } from 'express'

import * as authController from './controller'
import checkEntryData from '../../middlewares/checkEntryData'
import verifySession from '../../middlewares/verifySession'
import loginSchema from './schemas/login.schema'

// Endpoint for login
router.post('/auth', checkEntryData(loginSchema), authController.login)

// Endpoint for close session
router.delete('/auth', authController.logout)

// Endpoint for verify session on front-end
router.get('/auth', verifySession, (req: Request, res: Response) => {
  res.status(200).json({ data: { message: 'Logged in.', user: req.user } })
})

export default router
