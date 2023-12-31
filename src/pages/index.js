import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import TableOptions from '@/components/tableOptions';
import TableFooter from '@/components/tableFooter';
import AddForm from '@/components/addForm';
import ProjectRow from '@/components/projectRow';

const inter = Inter({ subsets: ['latin'] })

/**
 * Fetches the data from the server-side API.
 *
 * @async
 * @function getServerSideProps
 * @returns {Promise<{ props: { data: Array } }>} The fetched data wrapped in a promise.
 */
export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/product')
    if(res.status == 200){
      const data = await res.json()
      return { props: { data: data, test:res.status } }
    }
    else {
      throw "wrong status"
    }
  }
  catch (error) {
    console.log("Error fetching data:", error)
    return { props: { data: [] } }
  }
}

/**
 * The Home component represents the main page of the application.
 *
 * @component
 * @example
 * // Render the component
 * <Home data={[]} />
 *
 * @param {object} props - The component props.
 * @param {Array} props.data - The data to be displayed in the table.
 * @returns {JSX.Element} The rendered component.
 */
export default function Home({ data }) {
  const [Form, setForm] = useState(false)
  const [viewData, setViewData] = useState(data)

  /**
   * Saves the data using the API.
   *
   * @param {object} data - The data to be saved.
   * @param {string} [met="POST"] - The HTTP method to be used (default: "POST").
   * @returns {void}
   */
  const saveData = async (data, met = "POST") => {
    const res = await fetch('http://localhost:3000/api/product', {
      method: met,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const rdata = await res.json()
    if(res.status == 201) setViewData(rdata)
    else alert("Product Creation Failed")
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.panelBorder}>
          <TableOptions show={setForm} />
          <div className={styles.tablePanel}>
            {viewData.length > 0
              ? viewData.map((val, key) => <ProjectRow key={key} data={val} />)
              : <>No Projects to display</>
            }
          </div>
          <TableFooter size={viewData.length} />
        </div>
        {Form ? <AddForm title="Add Product" save={saveData} cancel={setForm} /> : <></>}
      </main>
    </>
  )
}
