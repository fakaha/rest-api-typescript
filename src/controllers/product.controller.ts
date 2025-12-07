import { Request, Response } from 'express'
import { createProductValidation } from '../validation/product.validation'
import { logger } from '../utils/logger'
import db from '../utils/connectDB'
import { ProductModel } from '../models/product.model'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error, value } = createProductValidation(req.body)

    if (error) {
      logger.error(error?.details[0]?.message, 'ERR: product - create')
      return res.status(422).send({ status: false, statusCode: 422, message: error?.details[0]?.message, data: {} })
    }

    const result = await ProductModel.create(value.name, value.price)

    logger.info('Success add new product data')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: result })
  } catch (error: any) {
    logger.error(error.message, ' DB Error')
    res.status(500).send({ status: false, message: 'Internal Server Error' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.params

    const resultProduct = await ProductModel.get(name)

    logger.info('Product Check Success')
    return res.status(200).send({ status: true, statusCode: 200, data: resultProduct })
  } catch (error: any) {
    logger.error('DB Error : ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
  }
}
