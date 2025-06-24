import * as userModel from './model'
import { ApiError } from '../../middlewares/errorHandler'

export const getAllBranch = async () => {
  try {
    return await userModel.getAllBranch()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
