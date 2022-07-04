import React from 'react'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'

export default ({userPool, history, location, ...props}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const authenticationDetails = new AuthenticationDetails({
      Username: data.get('email'),
      Password: data.get('password')
    })
    const cognitoUser = new CognitoUser({
      Username: data.get('email'),
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        console.log('token', result.getIdToken().getJwtToken())
        history.replace({
          pathname: '/signin',
          state: {isAuthenticated: true}
        })
      },
      onFailure: err => {
        console.error("Auth failed", err)
        history.replace({
          pathname: '/signin',
          state: {error: err.message}
        })
      }
    })
  }
  return (
    location.state && location.state.isAuthenticated
    ? <h1>Hello, there. You've been sucessfully authenticated. Welcome to Cognito</h1>
    : <div>
        { location.state && location.state.error
          ? <h3>{location.state.error}</h3>
          : null
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Username</label>
          <input type='text' name='email' />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' />
          <button type='submit'>Sign In</button>
        </form>
      </div>
  )
}