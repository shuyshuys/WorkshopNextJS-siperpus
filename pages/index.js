// import header
import Header from '../components/Header'
import Layout from '@/widget/Layout'
import IkonUbah from '@/assets/IkonUbah'
import IkonDelete from '@/assets/IkonDelete'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { db } from '@/config/firebase'
import { collection, getDocs, doc, deleteDoc, query, orderBy } from 'firebase/firestore'

export default function Home() {
  const [buku, setBuku] = useState([])
  const router = useRouter()

  const addBookHandler = () => {
    router.push('/tambah-buku')
  }

  const updateBookHandler = (id) => {
    router.push(`/ubah-buku/${id}`)
  }

  const deleteBuku = async (id) => {
    try {
      await deleteDoc(doc(db, 'buku', id))
      getBukuList()
    } catch (err) {
      console.log(err)
    }
  }

  const bukuCollectionRef = collection(db, 'buku')
  // sort data
  const q = query(bukuCollectionRef, orderBy('namaBuku', 'asc'))

  const getBukuList = async () => {
    try {
      const data = await getDocs(q)
      const fiilteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data)
      setBuku(fiilteredData)
      console.log(buku)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBukuList()
  }, [])


  return (
    <Layout>
      <div className="flex justify-center min-h-screen py-2">
        <div>
          {/* {Judul} */}
          <div className='mt-10 mb-5'>
            <h3 className='text-2xl font-semibold'>
              Data Buku Perpustakaan
            </h3>
          </div>
          <button onClick={addBookHandler} className='bg-sky-500 text-white px-6 py-2 rounded-full'>
            Tambah Buku
          </button>
          <div className='mt-5'>
            <table className='table-auto bg-sky-50 py-10 rounded-xl'>
              <thead className='border-b-4'>
                <tr>
                  <th className='border px-6 py-2'>Nama Buku</th>
                  <th className='border px-6 py-2'>Pengarang</th>
                  <th className='border px-6 py-2'>Deskripsi Buku</th>
                  <th className='border px-6 py-2'>Tahun Terbit</th>
                  <th className='border px-6 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {buku.map((data) => (
                <tr className='hover:bg-sky-200'>
                  <td className='border px-6 py-2'>{data.namaBuku}</td>
                  <td className='border px-6 py-2'>{data.pengarang}</td>
                  <td className='border px-6 py-2'>{data.deskripsiBuku}</td>
                  <td className='border px-6 py-2'>{data.tahunTerbit}</td>
                  <td className='flex border px-6 py-2'>
                    <span onClick={() => { updateBookHandler(data.id); }} className='cursor-pointer h-8 w-8 mr-2 hover:text-sky-500'>
                      <IkonUbah />
                    </span>
                    <span className='cursor-pointer h-8 w-8 mr-2 hover:text-red-500'
                    onClick={ () => {
                      deleteBuku(data.id)}}
                    >
                      <IkonDelete />
                    </span>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
    // <div>
    //   <Header />
    //   <h1 className="title">
    //     Welcome to <a href="https://nextjs.org">Next.js!</a>
    //   </h1>
    // </div>
  )
}
