import db from '../utils/connectDB'

export interface UpdateProductInput {
  name?: string | null
  price?: number | null
  qty?: number | null
}

export const ProductModel = {
  get: async (id?: string, name?: string) => {
    if (id) {
      return await db.oneOrNone(`select * from products where id = $1`, [id])
    }

    if (name) {
      return await db.any(`select * from products where name ILIKE $1`, [`%${name}%`])
    }

    return await db.any(`select * from products`)
  },

  create: async (id: string, name: string, price: Number, qty: Number) => {
    return await db.one(`insert into products (id, name, price, qty) values ($1, $2, $3, $4) returning *`, [
      id,
      name,
      price,
      qty
    ])
  },
  update: async (value: UpdateProductInput, id?: string) => {
    const result = await db.result(
      `UPDATE products 
     SET name = COALESCE($1, name),
         price = COALESCE($2, price),
         qty = COALESCE($3, qty)
     WHERE id = $4`,
      [value.name, value.price, value.qty, id]
    )

    if (result.rowCount === 0) return null // stop di sini

    return await db.oneOrNone(`SELECT * FROM products WHERE id = $1`, [id])
  }
}
