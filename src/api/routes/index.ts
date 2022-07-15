import { Router }from "express"
import customers from "./routesTables/CustomersRoute"
import products from "./routesTables/ProductsRoute"
import employees from "./routesTables/EmployeesRoute"
import offices from "./routesTables/OfficesRoute"
import productlines from "./routesTables/ProductlinesRoute"
import orders from "./routesTables/OrdersRoute"
import payments from "./routesTables/PaymentsRoute"
import OrdersDetails from "./routesTables/OrdersDetailsRoute"
import authRouter from "./routesTables/AuthRoute"
import { ensureIsAuthenticated } from "../middlewares/AuthMiddleware"

const routes = Router()

routes.use("/auth", authRouter)

routes.use(ensureIsAuthenticated)

routes.use("/customers", customers)
routes.use("/employees", employees)
routes.use("/products", products)
routes.use("/offices", offices)
routes.use("/productlines", productlines)
routes.use("/orders", orders)
routes.use("/payments", payments)
routes.use("/OrdersDetails", OrdersDetails)

export default routes