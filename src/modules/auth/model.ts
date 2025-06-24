import prisma from '../../db/config'
import { UserWithPassword } from './types/auth.types'

import { ApiError } from '../../middlewares/errorHandler'

export const findUserWithPassword = async (
  username: string
): Promise<UserWithPassword> => {
  try {
    // Search user by username, if it find it, return username and password
    const user = await prisma.user.findUnique({
      where: {
        username
      },
      select: { username: true, password: true, role: true, name: true, id: true }
    })
    // if no user exists, return error
    if (!user) throw new ApiError(401, 'Usuario incorrecto.')
    return user
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
