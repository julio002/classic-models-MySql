import AppError from "../../utils/AppError"
import Model, { EmployeesInput, EmployeesOutput } from "../models/EmployeesModel"

export const getAll = async (): Promise<EmployeesOutput[]> => {
    return await Model.findAll({
        include: { all: true }
    })
}

export const getById = async (employeeNumber: number): Promise<EmployeesOutput> => {
    const employees = await Model.findOne({
        where: {
            employeeNumber: employeeNumber,
        },
        include: { all: true, nested: true }
    })

    if (!employees) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return employees
}

export const create = async (payload: EmployeesInput): Promise<EmployeesOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: number, payload: EmployeesInput): Promise<EmployeesOutput> => {
    const employees = await Model.findByPk(id)

    if (!employees) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await employees.update(payload)
}

export const deleteById = async (id: number): Promise<void> => {
    const employees = await Model.findByPk(id)

    if (!employees) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await employees.destroy()
}
