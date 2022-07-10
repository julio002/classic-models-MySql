import { Router } from "express";
import * as controller from "../../controllers/ProductlinesController"
import { ProductlinesCreateValidation, ProductlinesUpdateValidation } from "../../validations/ProductlinesValidation"

const router = Router(); 

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.post("/", ProductlinesCreateValidation, controller.create)

router.put("/:id", ProductlinesUpdateValidation, controller.updateById)

router.delete("/:id", controller.deleteById)

export default router;