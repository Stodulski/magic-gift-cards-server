import * as codeController from './controller'

import { Router } from 'express'

const router = Router()
import { useCodeSchema, createCodeSchema } from './schemas/code.schema'
import verifySession from '../../middlewares/verifySession'
import checkEntryData from '../../middlewares/checkEntryData'

router.post(
  '/codes',
  verifySession,
  checkEntryData(createCodeSchema),
  codeController.createCode
)
router.put(
  '/codes',
  verifySession,
  checkEntryData(useCodeSchema),
  codeController.updateCode
)
router.get('/codes/:lastCodeId', verifySession, codeController.getCodes)

export default router
