import Orders from "./models/OrdersModel"
import OrdersDetails from "./models/OrdersDetailsModel"
import Offices from "./models/OfficesModel"
import Employees from "./models/EmployeesModel"
import Customers from "./models/CustomersModel"
import Products from "./models/ProductsModel"
import Payments from "./models/PaymentsModel"
import Productlines from "./models/ProductlinesModel"
import connection from "../database/sequelize"

export const initdb = async () => {
    Promise.all([
        await connection(),
        console.log("Sincronizando as tabelas"),
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