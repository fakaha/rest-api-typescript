import db from '../utils/connectDB'

export const ProductModel = {
  get: async (name?: string) => {
    if (name) {
      return await db.oneOrNone(`select * from products where lower(name) = lower($1)`, [name])
    }

    return await db.any(`select * from products`)
  },

  create: async (name: string, price: Number) => {
    return await db.one(`insert into products (name, price) values ($1, $2) returning *`, [name, price])
  }
}
