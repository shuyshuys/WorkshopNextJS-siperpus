import React, { useState } from 'react'
import Layout from '@/widget/Layout'
import { db } from '@/config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'

const TambahBuku = () => {
  const [namaBuku, setNamaBuku] = useState("")
  const [pengarang, setPengarang] = useState("")
  const [deskripsiBuku, setDeskripsiBuku] = useState("")
  const [tahunTerbit, setTahunTerbit] = useState("")
  const bukuCollectionRef = collection(db, 'buku')
  const router = useRouter()
  
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await addDoc(bukuCollectionRef, {
        namaBuku: namaBuku,
        pengarang: pengarang,
        deskripsiBuku: deskripsiBuku,
        tahunTerbit: tahunTerbit,
      })
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className="flex justify-center mx-2 mt-10">
        <div className='w-[550px] rounded-lg shadow-gray-200 shadow-lg p-10'>
          {/* Judul */}
          <div className='mb-5'>
            <h3 className='text-2xl font-bold'>
              Form Tambah Buku
            </h3>
          </div>
          {/* Form */}
          <div>
            <form onSubmit={submitHandler}>
              <div className='mb-5'>
                <label className='block mb-1 font-bold text-gray-500'>Nama Buku</label>
                <input type='text' className='w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none' 
                onChange={(e) => {
                  setNamaBuku(e.target.value)
                }}
                value={namaBuku}
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-1 font-bold text-gray-500'>Pengarang</label>
                <input type='text' className='w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none'
                onChange={(e) => {
                  setPengarang(e.target.value)
                }}
                value={pengarang}
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-1 font-bold text-gray-500'>Deskripsi Buku</label>
                <textarea className='w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none' 
                onChange={(e) => {
                  setDeskripsiBuku(e.target.value)
                }}
                value={deskripsiBuku}
                />
              </div>
              <div className='mb-5'>
                <label className='block mb-1 font-bold text-gray-500'>Tahun Terbit</label>
                <input type='number' className='w-full border border-gray-500 rounded-md px-4 py-2 focus:outline-none' 
                onChange={(e) => {
                  setTahunTerbit(e.target.value)
                }}
                value={tahunTerbit}
                />
              </div>
              <div className='flex justify-end'>
                <button className='bg-fuchsia-500 text-white px-6 py-2 rounded-full hover:bg-fuchsia-700'>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <div>TambahBuku</div> */}
      </div>
    </Layout>

  )
}

export default TambahBuku