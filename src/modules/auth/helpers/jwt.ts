import jwt from 'jsonwebtoken'
import { ApiError } from '../../../middlewares/errorHandler'

export const signToken = (username: string): string => {
  const secret = process.env.JWT_SECRET as string
  const token = jwt.sign({ username }, secret, {
    expiresIn: '1d'
  })
  return token
}

export const verifyToken = (token: string): boolean => {
  const secret = process.env.JWT_SECRET as string
  try {
    jwt.verify(token, secret)
    return true
  } catch (error) {
    throw new ApiError(401, "Unauthorized.")
  }
}
