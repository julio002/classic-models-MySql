import { CustomersInput, CustomersOutput } from "../database/models/CustomersModel"
import * as repository from "../database/repositories/CustomersRepository"
import { Query } from "../shared/types/query"

export const getAll = async (customerName: string, creditLimitMax: string, creditLimitMin:string, creditLimit: string, query: Query): Promise<{rows:CustomersOutput[], count: number}> => {
    return await repository.getAll(customerName, query, creditLimitMax, creditLimitMin, creditLimit)
}

export const getById = async (id: number): Promise<CustomersOutput> => {
    return await repository.getById(id)
}

export const create = async (payload: CustomersInput): Promise<CustomersOutput> => {
    return repository.create(payload)
}

export const updateById = async (id: number, payload: CustomersInput): Promise<CustomersOutput> => {
    return await repository.updateById(id, payload)
}

export const deleteById = async (id: number): Promise<void> => {
    await repository.deleteById(id)
}