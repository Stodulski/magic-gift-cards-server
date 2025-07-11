import { NextFunction, Request, Response } from 'express'
import * as codeService from './service'

export const createCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, name, email, locality, province, phone, webId } = req.body
    await codeService.create(code, name, email, locality, province, phone, webId)
    res.status(200).json({ data: { message: 'Code created.' } })
  } catch (error) {
    next(error)
  }
}

export const updateCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, userId } = req.body
    await codeService.setUsed(code, parseInt(userId))
    res.status(200).json({ data: { message: 'Code used succesfully.' } })
  } catch (error) {
    next(error)
  }
}

export const getCodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cursor = req.params.lastCodeId
    const codes = await codeService.getAll(parseInt(cursor))
    res
      .status(200)
      .json({ data: { message: 'Codes retrieved successfully.', codes } })
  } catch (error) {
    next(error)
  }
}
