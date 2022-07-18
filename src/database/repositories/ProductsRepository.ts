import { Op } from "sequelize"
import AppError from "../../utils/AppError"
import Orders from "../models/OrdersModel"
import Model, { ProductsInput, ProductsOutput } from "../models/ProductsModel"

export const getAll = async (productLimitMin: string, productLimitMax: string): Promise<ProductsOutput[]> => {
    
    if(!productLimitMin) productLimitMin = "0"
    if(!productLimitMax) productLimitMax = "999999999999999999"

    const productMin = parseInt(productLimitMin)
    const productMax = parseInt(productLimitMax)

    return await Model.findAll({
        where: {
            quantityInStock: { [Op.between]: [productMin, productMax]}
        },
        include: { all: true }
    })
}

export const getById = async (id: string): Promise<ProductsOutput> => {
    const product = await Model.findOne({
        where: {
            productCode: id
        },
        include: { all: true, nested: true }
    })

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
