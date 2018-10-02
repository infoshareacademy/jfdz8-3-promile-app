import React, { Component } from 'react';

class EventShortView extends Component {
  render() {
    return(
      <div className="event_short_view">
        <div className="event_short_view-container">
          <div className="event_title">
              <p>{this.props.event.title}</p>
              <div
                className="event_technology">
                {this.props.event.technology}
              </div>
          </div>
        </div>
        <span
          className="technology_logo">
          <img
            alt="technology icon"
            src={this.props.icons[this.props.event.technology]}
          />
        </span>
      </div>
    )
  }
}

export default EventShortView