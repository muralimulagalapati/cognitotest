import React from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'

const Resend = ({userPool, history, ...props}) => {
  const handleSubmit = (event, formType) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const cognitoUser = new CognitoUser({
      Username: data.get('email'),
      Pool: userPool
    })

    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        console.error('Error re sending the code ', err)
        history.replace({ pathname: '/resend', state: {error: err.message}})
      } else {
        history.replace({ pathname: '/confirm', state: {email: data.get('email')}})
      }
    })
  }

  return (
    <div>
      {
        props.location.state && props.location.state.error
        ? <h4>{props.location.state.error}</h4>
        : null
      }
      <form onSubmit={(event) => handleSubmit(event, 'resend')}>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' />
        <button>Resend OTP</button>
      </form>
    </div>
  )
}

export default Resend
