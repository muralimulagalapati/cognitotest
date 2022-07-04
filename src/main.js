import { Config, CognitoIdentityCredentials } from 'aws-sdk'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import appConfig from './config.json'

Config.region = appConfig.region
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
})

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
})

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      phone: ''
    }
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handlePhoneChange(e) {
    this.setState({phone: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    const name = this.state.name.trim()
    const phone = this.state.phone.trim()
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: name }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: phone })
    ]
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) return console.error(err)
      console.log('user name is ' + result.user.getUsername())
      console.log('call result: ', JSON.stringify(result, null, 2))
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' value={this.state.email} placeholder='Email' onChange={this.handleEmailChange.bind(this)} />
        <input type='password' value={this.state.password} placeholder='Password' onChange={this.handlePasswordChange.bind(this)} />
        <input type='text' placeholder='GivenName' value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        <input type='text' placeholder='Phone' value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
        <input type='submit' />
      </form>
    )
  }
}

export default SignupForm
