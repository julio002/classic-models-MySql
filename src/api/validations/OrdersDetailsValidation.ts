import { celebrate, Joi, Segments } from "celebrate"

export const OrdersDetailsCreateValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        orderNumber: Joi.number().required(),
        productCode: Joi.string().required(),
        quantityOrdered: Joi.string().required(),
        priceEach: Joi.string().required(),
        orderLineNumber: Joi.string().required()
    }),
})

export const OrdersDetailsUpdateValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        orderNumber: Joi.number(),
        productCode: Joi.string(),
        quantityOrdered: Joi.string(),
        priceEach: Joi.string(),
        orderLineNumber: Joi.string()
    }).min(1),
})
