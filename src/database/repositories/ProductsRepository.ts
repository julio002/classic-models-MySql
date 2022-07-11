import AppError from "../../utils/AppError"
import Model, { ProductsInput, ProductsOutput } from "../models/ProductsModel"

export const getAll = async (): Promise<ProductsOutput[]> => {
    return await Model.findAll()
}

export const getById = async (id: string): Promise<ProductsOutput> => {
    const product = await Model.findByPk(id)

    if (!product) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return product
}

export const create = async (payload: ProductsInput): Promise<ProductsOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: string, payload: ProductsInput): Promise<ProductsOutput> => {
    const product = await Model.findByPk(id)

    if (!product) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await product.update(payload)
}

export const deleteById = async (id: string): Promise<void> => {
    const product = await Model.findByPk(id)

    if (!product) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await product.destroy()
}
