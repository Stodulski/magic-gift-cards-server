import { ApiError } from "../../middlewares/errorHandler"
import prisma from "../../db/config"
export const getAll = async ()=>{
    try {
        return await prisma.place.findMany({})
    } catch (error) {
        throw new ApiError(500, "Server error.")
    }
}