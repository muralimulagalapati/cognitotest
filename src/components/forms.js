import React from 'react'

const SignupForm = ({handleSubmit}) => (
  <form onSubmit={(event) => handleSubmit(event, 'signup')}>
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
)

const SigninForm = ({handleSubmit}) => (
  <form onSubmit={(event) => handleSubmit(event, 'signin')}>
    <label htmlFor='email'>Username</label>
    <input type='text' name='email' />
    <label htmlFor='password'>Password</label>
    <input type='password' name='password' />
    <button type='submit'>Sign In</button>
  </form>
)

const ConfirmationForm = ({handleSubmit}) => (
  <form onSubmit={(event) => handleSubmit(event, 'otp')}>
    <label htmlFor='otp'>OTP</label>
    <input type='password' name='otp' />
    <button type='submit'>Confirm</button>
  </form>
)

const resendOTP = ({handleSubmit}) => (
  <form onSubmit={(event) => handleSubmit(event, 'resend')}>
    <label htmlFor='email'>Email</label>
    <input type='text' name='email' />
    <button>Resend OTP</button>
  </form>
)

export { SignupForm, SigninForm, ConfirmationForm, resendOTP }
