import AppError from "../../utils/AppError"
import Model, { ProductlinesInput, ProductlinesOutput } from "../models/ProductlinesModel"
import Products from "../models/ProductsModel"

export const getAll = async (): Promise<ProductlinesOutput[]> => {
    return await Model.findAll({
        include: Products
    })
}

export const getById = async (productLine: string): Promise<ProductlinesOutput> => {
    const productlines = await Model.findOne({
        where: {
            productLine: productLine,
        },
        include: Products
    })

    if (!productlines) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return productlines
}

export const create = async (payload: ProductlinesInput): Promise<ProductlinesOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: string, payload: ProductlinesInput): Promise<ProductlinesOutput> => {
    const productlines = await Model.findByPk(id)

    if (!productlines) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await productlines.update(payload)
}

export const deleteById = async (id: string): Promise<void> => {
    const productlines = await Model.findByPk(id)

    if (!productlines) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await productlines.destroy()
}
