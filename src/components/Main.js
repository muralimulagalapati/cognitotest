import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {  CognitoUserPool } from 'amazon-cognito-identity-js'

import appConfig from '../config.json'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Resend from './Resend'
import Confirm from './Confirm'
import Home from './Home'

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
})

class Main extends React.Component {
  state = {
    isAuthenticated: false
  }

  handleAuthentication = (err, isAuth) => {
    if (err) {
      console.error(err)
    } else {
      this.setState({isAuthenticated: true})
    }
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup'
            render={ props => <SignUp userPool={userPool} {...props} />}
          />
          <Route exact path='/signin'
            render={props => <SignIn
              userPool={userPool}
              handleAuth={this.handleAuthentication}
              isAuthenticated={this.state.isAuthenticated}
              {...props} />
            }
          />
          <Route exact path='/resend'
            render={ props => <Resend userPool={userPool} {...props} />}
          />
          <Route exact path='/confirm'
            render={ props => <Confirm userPool={userPool} {...props} />}
          />
        </Switch>
      </main>
    )
  }
}

export default Main
