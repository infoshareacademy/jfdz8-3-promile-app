import React, { Component } from 'react'

class ListItem extends Component {

  state = {
    singleEvent: this.props.singleEvent
  };

  render() {
    return(
        <div>
          <li className="single-event" >
            <h2>{this.state.singleEvent.title}</h2>
            <p>{this.state.singleEvent.technology}</p>
          </li>
        </div>
      )
    }
}

export default ListItem



