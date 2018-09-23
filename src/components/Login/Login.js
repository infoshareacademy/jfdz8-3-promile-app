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
    .update({
      email: user.email,
    })
  }

  componentDidMount = () => {
      auth.onAuthStateChanged((user) => {
        this.setState({
          user: user
        })
        this.state.user &&
        this.addUserToDb()
        this.getLoggedUser()
      }
    );
  }

  clearInputs = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  registerNewUser = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
      })
    this.clearInputs()
  }

  logIn = (event) => {
      event.preventDefault()
      auth.signInWithEmailAndPassword(this.state.username, this.state.password)
    this.clearInputs()
  }

  logOut = (event) => {
      event.preventDefault()
      auth.signOut()
    this.clearInputs()
  }

  getLoggedUser = () => {
    const user = this.state.user
    this.props.getUser(user)
  }

  render() {
    return (
        <div className="login_container">
            <form className="form_container">
              <div className="login_inputs">
                <input
                  className="input_username"
                    placeholder="username"
                    onChange={(event) => this.setState({username: event.target.value})}
                    value={this.state.username}
                />
                <input
                  className="input_password"
                    placeholder="password"
                    onChange={(event) => this.setState({password: event.target.value})}
                    value={this.state.password}
                    type="password"
                />
              </div>
                {
                  !this.state.user &&
                  <div className="login_button_container">
                    <button
                      className="login_button"
                      onClick={(event) => this.logIn(event)}>
                      Login
                    </button>
                    <button
                      className="register_button"
                      onClick={(event) => this.registerNewUser(event)}>
                      Register
                    </button>
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