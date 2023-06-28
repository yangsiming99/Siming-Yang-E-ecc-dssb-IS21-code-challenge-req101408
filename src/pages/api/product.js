import path from 'path'
import { read_db, write_db } from '@/utils/json';

/**
 * Request handler function for handling HTTP requests.
 * @async
 * @function handler
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
export default async function handler(req, res) {
  const { method, body } = req;
  const file_path = path.join(process.cwd(), './src/data/products.json')

  let products = await read_db(file_path)
  switch (method) {
    case "GET":
      /**
       * Handle GET request.
       */
      try{
        res.status(200).json(products);
      }
      catch (e) {
        res.status(500).json({message: e})
      }
      break;
    case "POST":
      /**
       * Handle POST request.
       */
      try{
        let new_prod = { productId: products.length, ...body }
        console.log(new_prod)
        products.push(new_prod)
        await write_db(JSON.stringify(products), file_path)
        res.status(201).json(products)
      }
      catch(e) {
        res.status(500).json({message: e})
      }
      break;
    default:
      /**
       * Handle unsupported methods.
       */
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
      break;
  }
}