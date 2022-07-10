import { Router } from "express";
import * as controller from "../../controllers/CustomersController"
import { CustomersCreateValidation, CustomersUpdateValidation } from "../../validations/CustomersValidation"

const router = Router(); 

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.post("/", CustomersCreateValidation, controller.create)

router.put("/:id", CustomersUpdateValidation, controller.updateById)

router.delete("/:id", controller.deleteById)

export default router;