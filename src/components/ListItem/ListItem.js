import React, { Component } from 'react'
import EventDetails from '../EventDetails/EventDetails'

class ListItem extends Component {

  state = {
    clicked: false
  };

  handleRevertView = () => {
    this.props.revertView();
    this.setState({
      clicked: false
    })
  };

  handleClickCallback = (data) => {
    this.props.handleCallback(data);
    this.toggleClicked()
  };

  toggleClicked = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  };

  render() {
    return(
        <div>
          <ul>
            {this.props.eventsList.map(event =>
            <li key={event.id}
                className="single-event"
                onClick={() => this.state.clicked ? false: this.handleClickCallback(event)}
            >
              <h2>{event.title}</h2>
              <p>{event.technology}</p>
              <EventDetails singleEvent={event}
                            clicked={this.state.clicked}
                            handleChange={this.props.handleChange}
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



