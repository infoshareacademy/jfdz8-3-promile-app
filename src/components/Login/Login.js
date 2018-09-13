import React, { Component } from 'react';
import { database, auth } from '../FirebaseConfig/FirebaseConfig';

class Login extends Component {

  state = {
    username: '',
    password: '',
    user: null
  }

  addUserToDb = () => {
    const user = this.state.user
    database.ref(`users/${user.uid}`)
    .set({
      email: user.email,
      id: user.uid
    })
  }

  componentDidMount = () => {
      auth.onAuthStateChanged((user) => {
        this.setState({
          user: user
        })
        this.addUserToDb()
      }
    );
  }

  registerNewUser = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
        const errorCode = error.code;
      })
  }

  logIn = (event) => {
      event.preventDefault()
      auth.signInWithEmailAndPassword(this.state.username, this.state.password)
  }

  logOut = (event) => {
      event.preventDefault()
      auth.signOut()
  }

  render() {
    return (
        <div>
            <form>
                <input
                    placeholder="username"
                    onChange={(event) => this.setState({username: event.target.value})}
                    value={this.state.username}
                />
                <input
                    placeholder="password"
                    onChange={(event) => this.setState({password: event.target.value})}
                    value={this.state.password}
                />
                {
                  !this.state.user &&
                  <div>
                    <button onClick={(event) => this.logIn(event)}>Login</button>
                    <button onClick={(event) => this.registerNewUser(event)}>Register</button>
                  </div>
                }

                {
                  this.state.user &&
                    <button onClick={(event) => this.logOut(event)}>Logout</button>
                }

            </form>
        </div>
    )
  }
}

export default Login