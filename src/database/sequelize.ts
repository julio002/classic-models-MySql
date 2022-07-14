import { Error, Sequelize } from "sequelize"

export const sequelize = new Sequelize("classicmodels", "root", "julio002", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    },
    timezone: "-03:00",
    logging: false,
})

export default async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log("Conexão com o mysql realizada sucesso!")
        })
        .catch((error: Error) => {
            console.log(`Conexão não realizada: ${error}`)
        })
}