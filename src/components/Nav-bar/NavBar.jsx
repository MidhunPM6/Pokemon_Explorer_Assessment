import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {
  return (
    <div className='lg:flex-row  flex flex-col lg:justify-between justify-center items-center pl-6 lg:pb-0  shadow-md lg:h-[10vh] h-[20vh] border-gray-200 gap-4'>
      <div className='flex justify-center items-center gap-2 '>
        <Image src='/logo.png' width={50} height={50} alt='pokemon logo' />
        <h1 className='text-2xl font-bold flex justify-center items-center text-indigo-500 text-end shadow-2xl'>
          {' '}
          Pokemon Explorer
        </h1>
      </div>
      <div className='flex justify-center items-center gap-4 text-gray-700 text-sm lg:pr-20 '>
        <a href='/' className='hover:text-gray-900 p-2'>
          Home
        </a>

        <Link
          href={'/'}
          className='hover:text-gray-900 p-2 transition-all duration-300 '
        >
          Pokemon
        </Link>
        <Link
          href={'/'}
          className='hover:text-gray-900 p-2 transition-all duration-300  '
        >
          Top 10
        </Link>
      </div>
    </div>
  )
}

export default NavBar
