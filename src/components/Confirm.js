import React from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'

export default ({userPool, history, location, ...props}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    let email = null
    try {
      email = location.state.email
    } catch (ex) {
      history.replace({pathname: '/confirm', error: 'User not found in DB'})
      return null
    }
  
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    })

    cognitoUser.confirmRegistration(data.get('otp'), true, (err, result) => {
      if (err) {
        console.error('Error confirming OTP ', err)
        history.replace({pathname: '/confirm', state: {error: err.message}})
      } else {
        history.replace('/signin')
      }
    })
  }

  return (
    <div>
      { location.state && location.state.error
        ? <h3>{location.state.error}</h3>
        : null
      }
      <form onSubmit={handleSubmit}>
        <label htmlFor='otp'>OTP</label>
        <input type='password' name='otp' />
        <button type='submit'>Confirm</button>
      </form>
    </div>
  )
}
