import AppError from "../../utils/AppError"
import Customers from "../models/CustomersModel"
import Model, { PaymentsInput, PaymentsOutput } from "../models/PaymentsModel"

export const getAll = async (): Promise<PaymentsOutput[]> => {
    return await Model.findAll({
        include: Customers
    })
}

export const getById = async (checkNumber: string): Promise<PaymentsOutput> => {
    const payments = await Model.findOne({
        where: {
            checkNumber: checkNumber,
        },
        include: Customers
    })

    if (!payments) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return payments
}

export const create = async (payload: PaymentsInput): Promise<PaymentsOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: string, payload: PaymentsInput): Promise<PaymentsOutput> => {
    const payments = await Model.findByPk(id)

    if (!payments) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await payments.update(payload)
}

export const deleteById = async (id: string): Promise<void> => {
    const payments = await Model.findByPk(id)

    if (!payments) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await payments.destroy()
}
