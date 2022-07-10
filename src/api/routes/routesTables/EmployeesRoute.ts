import { Router } from "express";
import * as controller from "../../controllers/EmployeesController"
import { EmployeesCreateValidation, EmployeesUpdateValidation } from "../../validations/EmployeesValidation"

const router = Router(); 

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.post("/", EmployeesCreateValidation, controller.create)

router.put("/:id", EmployeesUpdateValidation, controller.updateById)

router.delete("/:id", controller.deleteById)

export default router;