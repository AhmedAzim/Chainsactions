import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-[65vh]'>
        <h1 className='text-white text-7xl py-12 font-semibold'>Let's take a deeper look!</h1>
        <input id='search' className='w-2/6 h-12 pl-6 bg-[#ffffff33] border-[#ffffffee] text-[#38FFD3] focus:bg-[#001735] rounded-lg' placeholder='Enter a wallet address...'></input>
    </div>
  )
}

export default Search