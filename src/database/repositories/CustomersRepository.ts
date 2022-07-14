import AppError from "../../utils/AppError"
import Model, { CustomersInput, CustomersOutput } from "../models/CustomersModel"
import Employees from "../models/EmployeesModel"
import Orders from "../models/OrdersModel"

export const getAll = async (): Promise<CustomersOutput[]> => {
    return await Model.findAll({
        include: [Orders, Employees]
    })
}

export const getById = async (id: number): Promise<CustomersOutput> => {
    const customer = await Model.findOne({
        where: {
            customerNumber: id,
        },
        include: [Orders, Employees]
    })

    if (!customer) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return customer
}

export const create = async (payload: CustomersInput): Promise<CustomersOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: number, payload: CustomersInput): Promise<CustomersOutput> => {
    const customer = await Model.findByPk(id)

    if (!customer) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await customer.update(payload)
}

export const deleteById = async (id: number): Promise<void> => {
    const customer = await Model.findByPk(id)

    if (!customer) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await customer.destroy()
}
