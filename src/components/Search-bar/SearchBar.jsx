'use client'
import api from '@/axiosInstance'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const SearchBar = ({ setSearchedPokemon }) => {
  const [search, setSearch] = useState('')

  // API to fetch searched pokemon result
  const handleSearch = async e => {
    e.preventDefault()
    const trimmedSearch = search.trim()
    if (!trimmedSearch) {
      toast.error('Please enter a Pokemon name.', { duration: 2000 })
      return
    }
    try {
      const response = await api.get(`pokemon/${search}`)
      setSearchedPokemon(response.data)
    } catch (error) {
      toast.error('No results found. Please try a different Pokémon name.', {
        duration: 2000
      })
    }
  }

  return (
    <>
      <Toaster></Toaster>
      <div className='flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 via-indigo-200 to-pink-100 bg-opacity-60 lg:h-[400px] h-[300px] gap-3  '>
        <div className='max-w-xl mx-auto text-center px-4 tracking-wide'>
          <h1 className='text-3xl lg:text-5xl font-extrabold leading-tight'>
            Explore the World of Pokémon — <br />
            <span className='bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-900 bg-clip-text text-transparent'>
              One Search Away
            </span>
          </h1>
          <p className='mt-2 text-base text-gray-600'>
            Search any Pokémon and discover their stats, types, and more.
          </p>
        </div>
        <div className=' flex justify-center mt-4  '>
          <div className='relative w-full flex gap-4 '>
            <form action='' className='flex gap-2'>
              <input
                className='p-3 bg-white pl-10 lg:w-[35vw] w-[60vw]  rounded-md shadow-lg '
                type='text'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search here for pokemon'
              />
              <button
                type='submit'
                onClick={handleSearch}
                className='bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700 p-3 shadow-md cursor-pointer'
              >
                Search
              </button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6 absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-500'
              >
                <path
                  fillRule='evenodd'
                  d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
