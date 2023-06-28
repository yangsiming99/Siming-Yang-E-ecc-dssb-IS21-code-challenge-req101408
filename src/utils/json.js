import fs from 'fs/promises'

/**
 * Reads the contents of a JSON file asynchronously.
 * @async
 * @function read_db
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of objects read from the JSON file.
 * @throws {Error} If there was an error reading the file.
 */
export async function read_db(file_path) {
  try {
    return await JSON.parse(await fs.readFile(file_path, 'utf-8'))
  }
  catch (err) {
    console.error("Could not read file")
  }
}

/**
 * Writes data to a JSON file asynchronously.
 * @async
 * @function write_db
 * @param {string} data - The data to be written to the JSON file.
 * @throws {Error} If there was an error writing the file.
 */
export async function write_db(data, file_path) {
  try {
    await fs.writeFile(file_path, data, 'utf-8')
  }
  catch (err) {
    console.error("Could not write file")
  }
}