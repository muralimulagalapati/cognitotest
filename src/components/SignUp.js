import React from 'react'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const SignUp = ({userPool, history, location, ...props}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const [email, password, name, phone, ...rest] = data
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email[1]
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: name[1]
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phone[1]
      })
    ]

    userPool.signUp(email[1], password[1], attributeList, null, (err, result) => {
      if (err) {
        console.error("Error signing up ", err)
        history.replace({
          pathname: '/signup',
          search: '',
          state: { error: err.message }
        })
      } else {
        history.replace({
          pathname: '/confirm',
          search: '',
          state: { email: email[1] }
        })
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
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' />
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' />
        <label htmlFor='phone'>Phone</label>
        <input type='text' name='phone' />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
