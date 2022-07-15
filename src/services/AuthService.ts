import { UserAttributes } from "../database/models/UserModel"
import * as repository from "../database/repositories/UserRepository"
import AppError from "../utils/AppError"
import jwt from "jsonwebtoken"
import { secret } from "../config/auth.config"
import bcrypt from "bcrypt"

export const signUp = async ( { email, password }: UserAttributes): Promise<{email: string}> => {
    password = bcrypt.hashSync(password, 10)

    const user = await repository.create({email, password})

    return {email: user.email}
}

export const signIn = async ( { email, password }: UserAttributes ): Promise<{ token: string }> => {
    const token = jwt.sign({email: email,}, secret, 
        {expiresIn: "24h" }
        )
    
    try {
        const user = await repository.findById(email)

        if (bcrypt.compareSync(password, user.password)) {
            return { token: token }
        }   else {
            throw new Error
        }

    } catch (error) {
        throw new AppError("Unauthorized", "Usuário e/ou senha estão incorretors", 401)
    }
}