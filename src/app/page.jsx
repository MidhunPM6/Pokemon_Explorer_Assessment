'use client'

import NavBar from '@/components/Nav-bar/NavBar'
import SearchBar from '@/components/Search-bar/SearchBar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading/Loading'
import api from '@/axiosInstance'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Home () {
  const [pokemons, setPokemons] = useState([])
  const [searchedPokemon, setSearchedPokemon] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Fetching pokemons entire details from the API
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        const response = await api.get('/pokemon?limit=30')
        const detailedPokemons = await Promise.all(
          response.data.results.map(async pokemon => {
            const detailedPokemon = await axios.get(pokemon.url)
            return detailedPokemon.data
          })
        )
        setPokemons(detailedPokemons)
      } catch (error) {
        toast.error('No results found. Please try a again.', { duration: 2000 })
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [])

  // Passing the selected pokemon name to the pokemon details page
  const handleDetailView = (e, pokemon) => {
    e.preventDefault()
    router.push(`/pokemondetails/${pokemon}`)
  }

  return (
    <>
      <Toaster></Toaster>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div>
          <NavBar />
          <SearchBar setSearchedPokemon={setSearchedPokemon} />

          <div className='flex flex-col  items-center h-screen'>
            <h1 className='text-2xl font-bold  items-center mt-6  text-end shadow-2xl'>
              {' '}
              {searchedPokemon ? 'Search Results :' : 'All Pokemons'}
            </h1>

            {searchedPokemon ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto mt-6  '>
                <div
                  onClick={e => handleDetailView(e, searchedPokemon.name)}
                  className='flex flex-col justify-center items-center gap-3 bg-gray-100 shadow-md rounded-xl cursor-pointer hover:transform hover:-translate-y-6 hover:-translate-x-6 hover:shadow-xl transition-all duration-300'
                >
                  <Image
                    src={
                      searchedPokemon?.sprites.other['official-artwork']
                        .front_default
                    }
                    width={250}
                    height={250}
                    alt={searchedPokemon?.name}
                    className='p-2'
                  ></Image>
                  <h1 className='text-2xl font-bold bg-gradient-to-r from-[#dfe2fe] via-[#b1cbfa] to-[#8e98f5] text-gray-700 w-full text-center p-3 rounded-b-md'>
                    {searchedPokemon?.name}
                  </h1>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto mt-6  '>
                {pokemons &&
                  pokemons.map(pokemon => (
                    <div
                      key={pokemon?.name}
                      onClick={e => handleDetailView(e, pokemon.name)}
                      className='flex flex-col justify-center items-center gap-3 bg-gray-100 shadow-md rounded-xl cursor-pointer hover:transform hover:-translate-y-6 hover:-translate-x-6 hover:shadow-xl transition-all duration-300'
                    >
                      <Image
                        src={
                          pokemon.sprites.other['official-artwork']
                            .front_default
                        }
                        width={250}
                        height={250}
                        alt={pokemon.name}
                        className='p-2'
                      ></Image>
                      <h1 className='text-2xl font-bold bg-gradient-to-r from-[#dfe2fe] via-[#b1cbfa] to-[#8e98f5] text-gray-700 w-full text-center p-3 rounded-b-md'>
                        {pokemon?.name}
                      </h1>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
