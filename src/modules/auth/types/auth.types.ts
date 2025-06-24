import { UserRole } from "../../../prisma"
import { Request } from "express"

declare global {
 namespace Express{
    interface Request{
      user?: {
        name: string,
        role: UserRole
        id: number
      }
    }
 }
}

export interface AuthenticatedRequest extends Request {
  user?: { name: string; role: UserRole, id: number } // Ajusta el tipo según lo esperado
}


export type UserWithPassword ={
    username: string
    password: string
    name: string
    role: UserRole
    id: number
}