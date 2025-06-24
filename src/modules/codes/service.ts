import * as codeModel from './model'
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
    await codeModel.create(code, name, email, locality, province, phone, webId)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const setUsed = async (code: string, userId: number) => {
  try {
    await codeModel.findOne(code)
    const date = new Date()
    const formattedDate = date.toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    })
    await codeModel.update(code, userId, formattedDate)
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const getAll = async (cursor: number) => {
  try {
    const options = {
      take: 15,
      orderBy: {
        id: 'asc'
      },
      select: {
        id: true,
        code: true,
        name: true,
        province: true,
        locality: true,
        phone: true,
        email: true,
        usedAt: true,
        used: true,
        webId: true,
        User: {
          select: {
            id: true,
            name: true
          }
        }
      }
    } as PaginationOptions
    if (cursor) {
      options.cursor = { id: cursor }
      options.skip = 1
    }
    const codes = await codeModel.findAll(options)
    return codes
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
