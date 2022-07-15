import { NextFunction, Request, Response } from "express"
import AppError from "../../utils/AppError"
import { secret } from "../../config/auth.config"
import jwt from "jsonwebtoken"

export const ensureIsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if(!token) {
        throw new AppError("MissedToken", "O token não está presente na requisição", 401)
    }

    try {
        jwt.verify(token,secret)
    } catch (error) {
        throw new AppError("InvalidToken", "O token não é valido", 401)
    }
    
    next()
}