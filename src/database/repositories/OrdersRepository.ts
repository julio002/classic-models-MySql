import { Op } from "sequelize"
import AppError from "../../utils/AppError"
import Model, { OrdersInput, OrdersOutput } from "../models/OrdersModel"

export const getAll = async (dateLimitMin: string, dateLimitMax: string,): Promise<OrdersOutput[]> => {
    
    if(!dateLimitMin) dateLimitMin = "0"
    if(!dateLimitMax) dateLimitMax = "999999999999999999"

    const dateMin = parseInt(dateLimitMin)
    const dateMax = parseInt(dateLimitMax)

    return await Model.findAll({
        where: {
            orderDate: { [Op.between]: [dateMin, dateMax]}
        },
        include: { all: true }
    })
}

export const getById = async (orderNumber: number): Promise<OrdersOutput> => {
    const orders = await Model.findOne({
        where: {
            orderNumber: orderNumber
        },
        include: { all: true, nested: true }
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
