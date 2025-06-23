import * as placeModel from './model'
import { ApiError } from '../../middlewares/errorHandler'

export const getAll = async () => {
  try {
    return await placeModel.getAll()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
