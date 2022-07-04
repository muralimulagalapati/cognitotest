import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <h1>Welcome to Cognito Test Page</h1>
    <h2>Please </h2>
    <Link to='/signup'>Join Us</Link>
    <h2>Alredy an existing user?</h2>
    <Link to='/signin'>Login</Link>
  </div>
)