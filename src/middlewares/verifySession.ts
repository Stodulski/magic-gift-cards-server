import { ApiError } from "./errorHandler"
import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../modules/auth/helpers/jwt"

// Middleware verify session
const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token as string
  try {
    verifyToken(token)
    next()
  } catch (error) {
    throw new ApiError(401, "Unauthorized.")
  }
}

export default verifySession