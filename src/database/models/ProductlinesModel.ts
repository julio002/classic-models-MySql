import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../../database/sequelize"
import Products from "./ProductsModel"

interface ProductlinesAttributes{
    productLine: string,
    textDescription?: string,
    htmlDescription?: string,
}

export interface ProductlinesInput extends Optional<ProductlinesAttributes, 'productLine'>{}
export interface ProductlinesOutput extends Required<ProductlinesAttributes>{}

class Productlines extends Model<ProductlinesAttributes, ProductlinesInput> {
    declare productLine: string
    declare textDescription: string
    declare htmlDescription: string
}

Productlines.init({
    productLine: { type: DataTypes.STRING(50), primaryKey: true, autoIncrement: true, },
    textDescription: { type: DataTypes.STRING(4000) },
    htmlDescription: { type: DataTypes.TEXT },
}, {
    sequelize,
    modelName:"productlines"
})

Products.hasMany(Productlines, {foreignKey: "productLine"})
Productlines.belongsTo(Products, {foreignKey: "productLine"})

export default Productlines