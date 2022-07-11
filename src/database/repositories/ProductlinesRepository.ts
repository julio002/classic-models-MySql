import AppError from "../../utils/AppError";
import Model, { ProductlinesInput, ProductlinesOutput } from "../models/ProductlinesModel";

export const getAll = async (): Promise<ProductlinesOutput[]> => {
    return await Model.findAll();
};

export const getById = async (id: number): Promise<ProductlinesOutput> => {
    const productlines = await Model.findByPk(id);

    if (!productlines) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404);
    }
    return productlines;
};

export const create = async (payload: ProductlinesInput): Promise<ProductlinesOutput> => {
    return await Model.create(payload);
};

export const updateById = async (id: number, payload: ProductlinesInput): Promise<ProductlinesOutput> => {
    const productlines = await Model.findByPk(id);

    if (!productlines) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404);
    }

    return await productlines.update(payload);
};

export const deleteById = async (id: number): Promise<void> => {
    const productlines = await Model.findByPk(id);

    if (!productlines) {
        throw new AppError("NotFoundError", "Registro não encontrado", 404);
    }

    return await productlines.destroy();
};
