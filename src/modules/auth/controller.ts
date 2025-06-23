import * as authService from './service'

import { Request, Response, NextFunction } from 'express'
import { UserWithPassword } from './types/auth.types'
import { signToken } from './helpers/jwt'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body as UserWithPassword
    // Check username and password
    await authService.checkLogin(username, password)
    // If data entry is ok, sign token & cookie
    const token = signToken(username)
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    })
    res.status(200).json({ data: { message: 'Logged in.' } })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response) => {
  res
    .clearCookie('token')
    .status(200)
    .json({ data: { message: 'Logged out.' } })
}
