import React, { Component } from 'react';
import { database, auth } from '../FirebaseConfig/FirebaseConfig';

class Login extends Component {

  state = {
    username: '',
    password: '',
    logged: false  
     
  }

    registerNewUser = (event) => {
          event.preventDefault()
          auth.createUserWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
          const errorCode = error.code;
          alert(errorCode)
        })
    }

    logIn = (event) => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(this.state.username, this.state.password)
        this.setState({
          logged: true
        })
        alert("LOGGED")
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
                <button onClick={(event) => this.logIn(event)}>Login</button>
                <button onClick={(event) => this.registerNewUser(event)}>Register</button>
                <button>Logout</button>
            </form>
        </div>
    )
  }
}

export default Login