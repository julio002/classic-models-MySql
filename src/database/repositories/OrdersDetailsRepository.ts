import AppError from "../../utils/AppError"
import Model, { OrdersDetailsInput, OrdersDetailsOutput } from "../models/OrdersDetailsModel"

export const getAll = async (): Promise<OrdersDetailsOutput[]> => {
    return await Model.findAll()
}

export const getById = async (id: number): Promise<OrdersDetailsOutput> => {
    const OrdersDetails = await Model.findByPk(id)

    if (!OrdersDetails) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return OrdersDetails
}

export const create = async (payload: OrdersDetailsInput): Promise<OrdersDetailsOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: number, payload: OrdersDetailsInput): Promise<OrdersDetailsOutput> => {
    const OrdersDetails = await Model.findByPk(id)

    if (!OrdersDetails) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await OrdersDetails.update(payload)
}

export const deleteById = async (id: number): Promise<void> => {
    const OrdersDetails = await Model.findByPk(id)

    if (!OrdersDetails) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await OrdersDetails.destroy()
}
