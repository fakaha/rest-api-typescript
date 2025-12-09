import Joi from 'joi'

interface ProductInterface {
  name: string
  price: number
  qty: number
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    // id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    qty: Joi.number().allow('', null)
  })
  return schema.validate(payload)
}

export const updateProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    qty: Joi.number().allow('', null)
  })
  return schema.validate(payload)
}
