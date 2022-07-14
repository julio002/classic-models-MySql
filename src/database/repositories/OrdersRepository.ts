import AppError from "../../utils/AppError"
import OrdersDetails from "../models/OrdersDetailsModel"
import Model, { OrdersInput, OrdersOutput } from "../models/OrdersModel"
import Products from "../models/ProductsModel"

export const getAll = async (): Promise<OrdersOutput[]> => {
    return await Model.findAll({
        include: Products
    })
}

export const getById = async (id: number): Promise<OrdersOutput> => {
    const orders = await Model.findOne({
        where: {
            orderNumber: id
        },
        include: Products
    })

    if (!orders) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return orders
}

export const create = async (payload: OrdersInput): Promise<OrdersOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: number, payload: OrdersInput): Promise<OrdersOutput> => {
    const orders = await Model.findByPk(id)

    if (!orders) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await orders.update(payload)
}

export const deleteById = async (id: number): Promise<void> => {
    const orders = await Model.findByPk(id)

    if (!orders) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await orders.destroy()
}
