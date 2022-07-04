import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/App.css'

export default () => (
  <header className='header'>
    <nav className='headerRight'>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
        <li><Link to='/signin'>Sign In</Link></li>
        <li><Link to='/resend'>Resend OTP</Link></li>
      </ul>
    </nav>
  </header>
)
