import React, { Component } from 'react'

class Test extends Component {

  state = {
    events: []
  };

  getEvents = () => {
    fetch(`http://localhost:3000/events`)
      .then(results => {
        return results.json()
      })
      .then(eventList => {
        this.setState({
          events: eventList
        })
      })
  }

  componentDidMount() {
    this.getEvents()
  }

  render() {
    return(
      <div>
        {this.state.events.map(item => {
          return (
            <p>Coordinates are {item.coordinates[0]}, {item.coordinates[1]}</p>
          )
        })}
      </div>


    )
  }
}

export default Test