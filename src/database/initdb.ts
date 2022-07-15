import connection from "../database/sequelize"

import User from "./models/UserModel"
import Customers from "./models/CustomersModel"
import Employees from "./models/EmployeesModel"
import Offices from "./models/OfficesModel"
import OrdersDetails from "./models/OrdersDetailsModel"
import Orders from "./models/OrdersModel"
import Payments from "./models/PaymentsModel"
import Productlines from "./models/ProductlinesModel"
import Products from "./models/ProductsModel"

export const initdb = async () => {
    Promise.all([
        await connection(),
        console.log("Sincronizando as tabelas"),
        await User.sync({ alter: true }),
        await Customers.sync({ alter: true }),
        await Employees.sync({ alter: true }),
        await Offices.sync({ alter: true }),
        await OrdersDetails.sync({ alter: true }),
        await Orders.sync({ alter: true }),
        await Payments.sync({ alter: true }),
        await Productlines.sync({ alter: true }),
        await Products.sync({ alter: true }),
    ]).then( () => {
        console.log("Tabelas sincronizadas com sucesso")
    })
}