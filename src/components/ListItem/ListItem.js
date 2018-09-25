import React, { Component } from 'react'
import EventDetails from '../EventDetails/EventDetails'
import pyIcon from '../../images/tech_icons/python_icon.png'
import jsIcon from '../../images/tech_icons/js_icon.png'
import javaIcon from '../../images/tech_icons/java_icon.png'
import dbIcon from '../../images/tech_icons/database_icon.png'
import phpIcon from '../../images/tech_icons/php_icon.png'

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
            <div className="event_short_view">
                <div className="event_short_view-container">
                  <div className="event_title">
                      {event.title}
                      <div className="event_technology">
                          {event.technology}
                      </div>
                  </div>
            </div>


            <span className="technology_logo"><img src={icons[event.technology]} /></span>
            </div>
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



