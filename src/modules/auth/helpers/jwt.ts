import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../../../middlewares/errorHandler'
import { UserRole } from '../../../prisma'

export const signToken = (name: string, role: UserRole, id: number): string => {
  const secret = process.env.JWT_SECRET as string
  const token = jwt.sign({ name, role, id }, secret, {
    expiresIn: '1d'
  })
  return token
}

export const verifyToken = (token: string): JwtPayload | string => {
  const secret = process.env.JWT_SECRET as string
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    throw new ApiError(401, 'Unauthorized.')
  }
}
