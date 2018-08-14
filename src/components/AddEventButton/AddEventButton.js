import React, { Component } from 'react'

class AddEventButton extends Component {
  render() {
    return (
      <div>
        <div>
          <button onClick={ () => alert('Hello')}>+</button>
        </div>
      </div>
    )
  }
}

export default AddEventButton