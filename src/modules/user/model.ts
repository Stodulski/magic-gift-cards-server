import { ApiError } from '../../middlewares/errorHandler'
import prisma from '../../db/config'
import { UserRole } from '../../prisma'

export const getAllBranch = async () => {
  try {
    return await prisma.user.findMany({
      where: {
        role: UserRole.BRANCH
      },
      select: { name: true, id: true }
    })
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}
