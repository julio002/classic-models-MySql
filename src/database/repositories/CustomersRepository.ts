import AppError from "../../utils/AppError"
import Model, { CustomersInput, CustomersOutput } from "../models/CustomersModel"
import { Query } from "../../shared/types/query"
import { getPagination } from "../../utils/getPagination"
import { Op } from "sequelize"

export const getAll = async (customerName: string, creditLimitMin: string, creditLimitMax: string, creditLimit: string, query: Query): Promise<{rows:CustomersOutput[], count: number}> => {
    let { size, page, sort, order, ...filters } = query

    if(!creditLimitMin) creditLimitMin = "0"
    if(!creditLimitMax) creditLimitMax = "999999999999999999"


    const creditMin = parseInt(creditLimitMin)
    const creditMax = parseInt(creditLimitMax)

    const id = "customerNumber"
    const {...pagination} = getPagination(id, query)
    
    if(!customerName) customerName = ""

    return await Model.findAndCountAll({
        where: {
            customerName: { [Op.like]: `%${customerName}%` },
            creditLimit: { [Op.between]: [creditMin, creditMax]},
            ...filters
        },
        include: { all: true },
        ...pagination
    })
}

export const getById = async (customerNumber: number): Promise<CustomersOutput> => {
    const customer = await Model.findOne({
        where: {
            customerNumber: customerNumber,
        },
        include: { all: true, nested: true }
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
