import React from 'react'
import { useState } from 'react'

/* Search Component */
const Search = () => {
  /* States */
  const [walletId, setWalletId] = useState('')

  /* Functions */
  function handleChange(event) {
    setWalletId(event.target.value)
    console.log(walletId)
  }

  /* Render */
  return (
    <div className='flex flex-col justify-center items-center w-full h-[65vh]'>
        <h1 className='text-white text-7xl py-12 font-semibold'>Let's take a deeper look!</h1>
        <input 
        id='search' 
        value={walletId} 
        onChange={handleChange} 
        className='w-2/6 h-12 pl-6 bg-[#ffffff33] border-[#ffffffee] text-[#38FFD3] focus:bg-[#001735] rounded-lg' 
        placeholder='Enter a wallet address...'></input>
    </div>
  )
}

export default Search