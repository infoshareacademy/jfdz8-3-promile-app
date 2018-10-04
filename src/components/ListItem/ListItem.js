import React, { Component } from 'react'
import EventDetails from '../EventDetails/EventDetails'
import pyIcon from '../../images/tech_icons/python_icon.png'
import jsIcon from '../../images/tech_icons/js_icon.png'
import javaIcon from '../../images/tech_icons/java_icon.png'
import dbIcon from '../../images/tech_icons/database_icon.png'
import phpIcon from '../../images/tech_icons/php_icon.png'
import angularIcon from '../../images/tech_icons/angular_logo.png'
import cPlusIcon from '../../images/tech_icons/c_plus_logo.png'
import gameIcon from '../../images/tech_icons/game_dev_icon.png'
import htmlIcon from '../../images/tech_icons/html_icon.png'
import nodeIcon from '../../images/tech_icons/node_icon.png'
import rubyIcon from '../../images/tech_icons/ruby_icon.png'
import cssIcon from '../../images/tech_icons/css_icon.png'
import reactIcon from '../../images/tech_icons/react_icon.png'
import { database } from '../FirebaseConfig/FirebaseConfig'
import { toast } from 'react-toastify';
import EventShortView from '../EventShortView/EventShortView';

const icons = {
  Python: pyIcon,
  SQL: dbIcon,
  Java: javaIcon,
  PHP: phpIcon,
  JavaScript: jsIcon,
  Angular: angularIcon,
  Cplus: cPlusIcon,
  GameDev: gameIcon,
  Html: htmlIcon,
  Node: nodeIcon,
  Ruby: rubyIcon,
  CSS: cssIcon,
  React: reactIcon
};

class ListItem extends Component {

  state = {
    clicked: false,
  };

  handleRevertView = () => {
    this.props.revertView();
    this.setState({
      clicked: !this.state.clicked
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

  deleteEvent = () => {
    database.ref(`/events/${this.props.eventClicked.id}`)
      .remove();
    toast.success('Usunąłeś wydarzenie');
    this.handleRevertView()
  };

  handleCloseListItem = () => {
    this.setState({
      clicked: false
    })
  }
  componentDidUpdate(nextProps) {
    if (nextProps.eventClicked !== this.props.eventClicked) {
      this.setState({
        clicked: this.props.eventClicked !== '' ? true : false
      })
    }
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.eventsList.map(event =>
          <li
            key={event.id}
            className="single-event"
            onClick={() => this.state.clicked ? false : this.handleClickCallback(event)}
          >
            <EventShortView
              event={event}
              icons={icons}
            />

            {
              this.props.user &&
              (this.props.eventClicked.creator === this.props.user.uid) &&
              <button className="event_delete_button" onClick={this.deleteEvent}>Usuń</button>
            }

            <EventDetails
              singleEvent={event}
              clicked={this.state.clicked}
              user={this.props.user}
            />
          </li>
          )}
          {this.props.eventClicked !== '' ?
              <div className="event_go_back_button">
                  <button
                      className="event_go_back_button_cover"
                      onClick={this.handleRevertView}
                  />
              </div>
            : false
          }
        </ul>
      </div>
      )
    }
}

export default ListItem
