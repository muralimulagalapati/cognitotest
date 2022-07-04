import React, { Component } from 'react'
import {  CognitoUserPool, 
          CognitoUserAttribute,
          CognitoUser,
          AuthenticationDetails } from 'amazon-cognito-identity-js'

import appConfig from '../config.json'
import Header from './header'
import {  SignupForm, SigninForm,
          ConfirmationForm, resendOTP } from './forms';

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
})

class App extends Component {
  state = {
    form: 'signup',
    cognitoUser: null
  }

  showRegister = () => {
    this.setState(prevState => {
      if (prevState === 'signup') return
      return { form: 'signup' }
    })
  }

  showSignIn = () => {
    this.setState(prevState => {
      if (prevState === 'signin') return
      return { form: 'signin' }
    })
  }

  handleSubmit = (event, formType) => {
    event.preventDefault()
    let data = new FormData(event.target)
    const dataObject = {};
    for (let [key, value] of data) {
      dataObject[key] = value.trim();
    }

    formType === 'signup'
    ? this.handleSignup(dataObject)
    : formType === 'signin'
    ? this.handleSignin(dataObject)
    : formType === 'otp'
    ? this.confirmRegistration(dataObject)
    : formType === 'resend'
    ? this.resendOTP(dataObject)
    : console.error('Invalid form type ', formType)
  }

  handleSignup = (dataObject) => {
    const { email, password, name, phone } = dataObject
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    })
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: name
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phone
      })
    ]
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        return console.error(err)
      }
      this.setState({
        form: 'otp',
        cognitoUser: cognitoUser
      })
    })
  }

  confirmRegistration = ({ otp }) => {
    this.state.cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        return console.error('confirmation error ', err)
      }
      console.log('call result ', result)
      this.setState({
        form: 'signin'
      })
    })
  }

  resendOTP = ({ email }) => {
    this.state.cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error('resend error', err)
      }
      this.setState({
        form: 'otp',
        cognitoUser: new CognitoUser({
          Username: email,
          Pool: userPool
        })
      })
    })
  }

  handleSignin = ({ email, password }) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    })
    this.state.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        console.log('token ', result.getAccessToken().getJwtToken())
      },
      onFailure: (err) => console.error(err)
    })
  }

  render() {
    const { form } = this.state
    console.log(this.state)
    return (
      <div>
        <Header showRegister={this.showRegister} showSignIn={this.showSignIn}/>
        { form === 'signup'
          ? <SignupForm handleSubmit={this.handleSubmit}/>
          : form === 'signin'
          ? <SigninForm handleSubmit={this.handleSubmit}/>
          : form === 'otp'
          ? <ConfirmationForm handleSubmit={this.handleSubmit} />
          : form === 'resend'
          ? <resendOTP handleSubmit={this.handleSubmit} />
          : null
        }
      </div>
    )
  }
}

export default App
