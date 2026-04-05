import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
   <header>
    <nav>
        <Link href="/" className='logo'> 
        <img src="./icons/logo.png" alt="logo" width={24} height={24} className='inline-block mr-2' />
        <p>DevEvent</p>
        </Link>
        <ul>
            <Link href='/'>Home</Link>
            <Link href='/events'>Events</Link>
            <Link href='/'>Create Event</Link>
        </ul>
    </nav>
   </header>
  )
}

export default Navbar
