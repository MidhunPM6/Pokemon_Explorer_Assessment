import React from 'react'
import Image from 'next/image'
import NavBar from '@/components/Nav-bar/NavBar'
import api from '@/axiosInstance'
import toast, { Toaster } from 'react-hot-toast'

export const pokemonView = async ({ params }) => {
  const { name } = await params

  // API to fetch selected pokemon details
  let pokemonDetails = {}
  try {
    const response = await api.get(`pokemon/${name}`)
    pokemonDetails = response.data
  } catch (error) {
    toast.error("No results found. Please try a again.",{duration:2000})
  }

  return (
    <>
    <Toaster></Toaster>
      <NavBar></NavBar>

      <div className='flex flex-col lg:flex-row justify-center items-start gap-8 pt-8'>
        <div className='bg-gray-100 shadow-xl rounded-md hover:shadow-2xl transition-all duration-300 max-w-[350px] w-full'>
          <Image
            src={pokemonDetails.sprites.other['official-artwork'].front_default}
            width={350}
            height={350}
            alt={pokemonDetails.name}
            className='w-full h-auto object-contain'
          />
        </div>

        <div className='flex flex-col gap-6 w-full max-w-xl  p-4 rounded-md border border-gray-300 shadow-xl hover:shadow-2xl transition-all duration-300'>
          <h1 className='text-2xl font-bold  text-center capitalize'>
            {pokemonDetails.name}
          </h1>

          <div>
            <h2 className='font-semibold mb-2'>Abilities</h2>
            <ul className='flex flex-wrap gap-2'>
              {pokemonDetails?.abilities?.map(ability => (
                <li
                  key={ability.ability.name}
                  className='px-2 py-1 bg-gray-100 rounded shadow text-sm capitalize'
                >
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='font-semibold mb-2'>Types</h2>
            <ul className='flex flex-wrap gap-2'>
              {pokemonDetails?.types?.map(type => (
                <li
                  key={type.type.name}
                  className='px-2 py-1 bg-gray-100 rounded shadow text-sm capitalize'
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='font-semibold mb-2'>Stats</h2>
            <ul className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {pokemonDetails?.stats?.map(stat => (
                <li
                  key={stat.stat.name}
                  className='px-2 py-1 bg-gray-100 rounded shadow text-sm capitalize'
                >
                  {stat.stat.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='font-semibold mb-2'>Moves</h2>
            <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto p-1'>
              {pokemonDetails?.moves?.map(move => (
                <li
                  key={move.move.name}
                  className='px-2 py-1 bg-gray-100 rounded shadow text-sm capitalize'
                >
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default pokemonView
