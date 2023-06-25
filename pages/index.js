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
  const [search, setSearch] = useState("")
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
  const sortByNamaBuku = query(bukuCollectionRef, orderBy('namaBuku', 'asc'))
  const sortByTahunTerbit = query(bukuCollectionRef, orderBy('tahunTerbit', 'desc'))

  const getBukuList = async (selectedOption) => {
    try {
      let queryToUse;
      if (selectedOption === "namaBuku") {
        queryToUse = sortByNamaBuku;
      } else if (selectedOption === "tahunTerbit") {
        queryToUse = sortByTahunTerbit;
      }

      const data = await getDocs(queryToUse)
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

  function handleSortOptionChange() {
    const selectElement = document.getElementById("sortOption");
    const selectedOption = selectElement.value;
  
    getBukuList(selectedOption);
  }

  useEffect(() => {
    handleSortOptionChange()
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
          {/* {Add Book} */}
          <button onClick={addBookHandler} className='bg-fuchsia-600 text-white px-6 py-2 rounded-full'>
            Add Book
          </button>
          {/* {Search} */}
          <div className='flex items-center justify-end'>
            {/* Sort by Select */}
            <select id="sortOption" onChange={handleSortOptionChange} className="border border-fuchsia-400 rounded-full py-2 px-4 m-2 bg-fuchsia-100">
              <option value="namaBuku">Sort by Name</option>
              <option value="tahunTerbit">Sort by Year Published</option>
            </select>
            {/* input */}
            <div className='relative text-gray-600'>
              <input
                title='by title and author'
                type='search'
                className='bg-fuchsia-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border border-fuchsia-400'
                onChange={(e) => setSearch(e.target.value)}
                name='search' placeholder='Type to search' />
              <button type='submit' className='absolute right-0 top-0 mt-3 mr-4'>
                <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 56.966 56.966' width='512px' height='512px'>
                  <path
                    d='M55.146,51.075L41.29,37.219c3.479-3.971,5.576-9.013,5.576-14.514C46.866,8.23,38.636,0,28.433,0
                    C18.23,0,10,8.23,10,18.705c0,10.204,8.23,18.434,18.705,18.434c4.5,0,8.543-2.097,12.514-5.576l13.856,13.856
                    c0.781,0.781,2.047,0.781,2.828,0l2.828-2.828C55.927,53.122,55.927,51.856,55.146,51.075z M18.705,31.139
                    c-7.18,0-13.034-5.854-13.034-13.034S11.525,5.07,18.705,5.07s13.034,5.854,13.034,13.034S25.885,31.139,18.705,31.139z'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='mt-2 mx-auto max-w-screen-lg overflow-x-auto'>
            <table className='table-auto bg-fuchsia-50 py-10 rounded-xl'>
              <thead className='border-b-4'>
                <tr>
                  <th className='border px-6 py-2'>Name of Book</th>
                  <th className='border px-6 py-2'>Author</th>
                  <th className='border px-6 py-2'>Description of Book</th>
                  <th className='border px-6 py-2'>Year of Publication</th>
                  <th className='border px-6 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {buku.length >= 1 ? (
                  buku
                    .filter((data) =>
                    // data.namaBuku.toLowerCase().includes(search)
                    {
                      const searchWords = search.toLowerCase().split(" ");
                      return searchWords.every((word) =>
                        data.namaBuku.toLowerCase().includes(word) ||
                        data.pengarang.toLowerCase().includes(word)
                      );
                    }
                    )
                    .map((data) => (
                      <tr className='hover:bg-fuchsia-200' key={data.id}>
                        <td className='border px-6 py-2'>{data.namaBuku}</td>
                        <td className='border px-6 py-2'>{data.pengarang}</td>
                        <td className='border px-6 py-2 '>{data.deskripsiBuku}</td>
                        <td className='border px-6 py-2'>{data.tahunTerbit}</td>
                        <td className='flex border px-6 py-2'>
                          <span className='cursor-pointer h-8 w-8 mr-2 hover:text-fuchsia-500'
                            onClick={() => { updateBookHandler(data.id); }}>
                            <IkonUbah />
                          </span>
                          <span className='cursor-pointer h-8 w-8 mr-2 hover:text-red-500'
                            onClick={() => { deleteBuku(data.id) }}>
                            <IkonDelete />
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className='border text-center p-5'>
                      No Data Found
                    </td>
                  </tr>

                )
                }
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
