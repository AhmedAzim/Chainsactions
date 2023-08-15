import React from 'react'
import logo from './images/Chainsactions.png';

const Navbar = () => {
  return (
    <div className='flex flex-row justify-center w-full'>
      <img className='w-64 py-6' src={logo} alt='Chainsactions'></img>
      <ul>
        <li>Sign Up</li>
      </ul>
    </div>
  )
}

export default Navbar