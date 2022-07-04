import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {  CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'

import appConfig from '../config.json'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Resend from './Resend'
import Confirm from './Confirm'

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
})

// const PrivateRoute = ({component: Component, ...rest}) => (
//   <Route
//     {...rest}
//     render={props => {
//       return (

//       )
//     }}
// )

class Main extends React.Component {
  state = {
    formType: 'signup',
    cognitoUser: none
  }

  handleSubmit = (formType, ...props) => {
    switch(formType) {
      case 'signup':
      case 'resend':
        this.setState({
          formType: 'confirm',
          cognitoUser: new CognitoUser({
            Username: props.email,
            Pool: userPool
          })
        })
      case 'confirm':
        this.setState({
          formType: 'signin'
        })
      default:
        this.setState({
          formType: 'signup'
        })        
    }
  }

  render () {
    return (
      <main>
        <Switch>
          <PrivateRoute exact path='/(signup|)'
            component={SignUp}
          />
          <PrivateRoute exact path='/signin' 
            render={props => <SignIn {...props}/>}
          />
          <PrivateRoute exact path='/resend'
            render={props => <Resend {...props}/>}
          />
          <PrivateRoute exact path='/confirm'
            render={props => <Confirm {...props}/>}
          />
        </Switch>
      </main>
    )
  }
}

export default Main
