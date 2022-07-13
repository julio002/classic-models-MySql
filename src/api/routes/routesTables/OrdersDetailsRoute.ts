import { Router } from "express"
import * as controller from "../../controllers/OrdersDetailsController"
import { OrdersDetailsCreateValidation, OrdersDetailsUpdateValidation } from "../../validations/OrdersDetailsValidation"

const router = Router() 

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.post("/", OrdersDetailsCreateValidation, controller.create)

router.put("/:id", OrdersDetailsUpdateValidation, controller.updateById)

router.delete("/:id", controller.deleteById)

export default router