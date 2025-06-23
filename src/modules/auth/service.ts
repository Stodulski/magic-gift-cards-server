import { ApiError } from '../../middlewares/errorHandler'
import * as authModel from './model'
import bcrypt from 'bcrypt'

const comparePassword = async (
  password: string,
  passwordHash: string
) => {
  const result = await bcrypt.compare(password, passwordHash)
  return result
}

export const checkLogin = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    // Find user searching by username, if exists return username & password
    const user = await authModel.findUserWithPassword(username)
    // Compare password
    const passwordResult = await comparePassword(password, user.password)
    if (!passwordResult) throw new ApiError(401, 'Contraseña incorrecta.')
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
