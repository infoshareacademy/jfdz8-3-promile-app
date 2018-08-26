import React, { Component } from 'react'

class ListItem extends Component {

  handleRevertView = () => {
    this.props.revertView()
  };

  render() {
    return(
        <div>
          <ul>
            {this.props.eventsList.map(event =>
            <li key={event.id}
                className="single-event"
            >
              <h2>{event.title}</h2>
              <p>{event.technology}</p>
              <button onClick={this.handleRevertView}>Back</button>
            </li>
            )}
          </ul>
        </div>
      )
    }
}

export default ListItem



