import React, { Component } from 'react'
import EventDetails from '../EventDetails/EventDetails'

class ListItem extends Component {

  state = {
    toggler: true
  }

  handleRevertView = () => {
    this.props.revertView()
    this.setState({
      toggler: false
    })
  };

  handleClickCallback = (data) => {
    this.props.handleCallback(data);
    this.toggleClick()
    };

    toggleClick = () => {
      this.setState({
        toggler: !this.state.toggler
      })
    }

  render() {
    return(
        <div>
          <ul>
            {this.props.eventsList.map(event =>
            <li key={event.id}
                className="single-event"
                onClick={() => this.handleClickCallback((event.id))}
            >
              <h2>{event.title}</h2>
              <p>{event.technology}</p>
              <EventDetails singleEvent={event}
                            visible={this.state.toggler}
              
              />
            </li>
            )}
            {this.props.eventClicked !== '' ?
              <button onClick={this.handleRevertView}>Back</button>
              : false
            }
          </ul>
        </div>
      )
    }
}

export default ListItem



