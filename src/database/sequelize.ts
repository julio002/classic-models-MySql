import { Error, Sequelize } from "sequelize"

export const sequelize = new Sequelize("classicmodels", "root", "123456", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: false,
})

export default () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log("Conexão com o mysql realizada sucesso!")
        })
        .catch((error: Error) => {
            console.log(`Conexão não realizada: ${error}`)
        })
}