import prisma from '../../db/config'

import { ApiError } from '../../middlewares/errorHandler'
import { PaginationOptions } from './types/code.types'

export const create = async (
  code: string,
  name: string,
  email: string,
  locality: string,
  province: string,
  phone: string,
  webId: string
) => {
  try {
    await prisma.code.create({
      data: {
        code,
        name,
        email,
        locality,
        province,
        phone,
        webId,
        createdAt: new Date().toLocaleString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour12: false
        })
      }
    })
  } catch (error: any) {
    console.log(error)
    if (error.code === 'P2002') {
      throw new ApiError(400, 'Codigo ya creado.')
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const findOne = async (code: string) => {
  try {
    const result = await prisma.code.findUnique({
      where: {
        code
      },
      select: {
        used: true,
        User: {
          select: {
            name: true
          }
        }
      }
    })
    if (result?.used)
      throw new ApiError(400, `Codigo usado en ${result.User?.name}`)
    if (!result) throw new ApiError(400, 'El codigo no existe.')
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const update = async (code: string, userId: number, usedAt: string) => {
  try {
    await prisma.code.update({
      where: {
        code
      },
      data: {
        used: true,
        usedAt,
        userId
      }
    })
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const findAll = async (options: PaginationOptions) => {
  try {
    return await prisma.code.findMany(options)
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}
