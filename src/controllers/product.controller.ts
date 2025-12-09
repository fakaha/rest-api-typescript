import { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validation/product.validation'
import { logger } from '../utils/logger'
import db from '../utils/connectDB'
import { ProductModel } from '../models/product.model'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const id = uuidv4()
    const { error, value } = createProductValidation(req.body)

    if (error) {
      logger.error(error?.details[0]?.message, 'ERR: product - create')
      return res.status(422).send({ status: false, statusCode: 422, message: error?.details[0]?.message, data: {} })
    }

    const result = await ProductModel.create(id, value.name, value.price, value.qty)

    logger.info('Success add new product data')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add product success', data: result })
  } catch (error: any) {
    logger.error(error.message, ' DB Error')
    res.status(500).send({ status: false, message: 'Internal Server Error' })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const name = req.query.name ? String(req.query.name) : ''

    const resultProduct = await ProductModel.get(id, name)

    logger.info('Product Check Success')
    return res.status(200).send({ status: true, statusCode: 200, data: resultProduct })
  } catch (error: any) {
    logger.error('DB Error : ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error, value } = updateProductValidation(req.body)

    if (error) {
      logger.error(error?.details[0]?.message, 'ERR: product - update')
      return res.status(422).send({ status: false, statusCode: 422, message: error?.details[0]?.message, data: {} })
    }

    const result = await ProductModel.update(value, id)
    if (!result) {
      return res.status(404).send({ status: false, statusCode: 404, message: 'Product Not Found' })
    }

    logger.info('Success update product')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Update product success', data: result })
  } catch (error: any) {
    logger.error('DB Error : ', error.message)
    return res.status(500).send({ status: false, statusCode: 500, message: 'Internal Server Error' })
  }
}
