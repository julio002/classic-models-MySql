import AppError from "../../utils/AppError"
import Model, { OfficesInput, OfficesOutput } from "../models/OfficesModel"

export const getAll = async (): Promise<OfficesOutput[]> => {
    return await Model.findAll()
}

export const getById = async (id: number): Promise<OfficesOutput> => {
    const offices = await Model.findByPk(id)

    if (!offices) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }
    return offices
}

export const create = async (payload: OfficesInput): Promise<OfficesOutput> => {
    return await Model.create(payload)
}

export const updateById = async (id: number, payload: OfficesInput): Promise<OfficesOutput> => {
    const offices = await Model.findByPk(id)

    if (!offices) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await offices.update(payload)
}

export const deleteById = async (id: number): Promise<void> => {
    const offices = await Model.findByPk(id)

    if (!offices) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404)
    }

    return await offices.destroy()
}
