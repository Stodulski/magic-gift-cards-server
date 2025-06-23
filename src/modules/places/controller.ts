import { NextFunction, Request, Response } from 'express'
import * as placeService from './service'

export const getAllPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const places = await placeService.getAll()
    res.status(200).json({
      data: {
        message: 'Places retrieved successfully.',
        places
      }
    })
  } catch (error) {
    next(error)
  }
}
