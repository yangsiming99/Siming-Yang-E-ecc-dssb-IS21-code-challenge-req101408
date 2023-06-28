import path from 'path'
import { read_db } from '@/utils/json'

/**
 * Request handler function for handling HTTP requests.
 * @async
 * @function handler
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
export default async function handler(req, res) {
  const { method, query } = req
  const id = Number(query.id)
  const file_path = path.join(process.cwd(), './src/data/products.json')

  let products = await read_db(file_path)

  switch (method) {
    case "GET":
      /**
       * Handle GET request.
       */
      const val = products.filter(product => product.productId === id)
      if (val.length < 1) {
        res.status(404).json({ message: "No Results Found" })
      } else {
        res.status(200).json(val[0])
      }
      break
    default:
      /**
       * Handle unsupported methods.
       */
      res.setHeader("Allow", ["GET"])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
      break
  }
}