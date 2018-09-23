import React, { Component } from 'react'
import EventDetails from '../EventDetails/EventDetails'
import pyIcon from '../../images/technologies_logo/python.png'
import jsIcon from '../../images/technologies_logo/js.png'
import javaIcon from '../../images/technologies_logo/java.png'
import dbIcon from '../../images/technologies_logo/database.png'
import phpIcon from '../../images/technologies_logo/php.png'

const icons = {
  Python: pyIcon,
  SQL: dbIcon,
  Java: javaIcon,
  PHP: phpIcon,
  JavaScript: jsIcon
};

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
            <span><img src={icons[event.technology]} /></span>
            <EventDetails singleEvent={event}
                          clicked={this.state.clicked}
                          user={this.props.user}
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
