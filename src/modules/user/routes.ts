import { Router } from 'express'
const router = Router()
import verifySession from '../../middlewares/verifySession'
import * as placeController from './controller'

router.get('/users', verifySession, placeController.getAllPlaces)

export default router
