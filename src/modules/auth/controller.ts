import * as authService from './service'

import { Request, Response, NextFunction } from 'express'
import { signToken } from './helpers/jwt'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body
    // Check username and password
    const user = await authService.checkLogin(username, password)
    // If data entry is ok, sign token & cookie
    const token = signToken(user.name, user.role, user.id)
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/'
    })
    res
      .status(200)
      .json({
        data: {
          message: 'Logged in.',
          user: { name: user.name, role: user.role, id: user.id }
        }
      })
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
