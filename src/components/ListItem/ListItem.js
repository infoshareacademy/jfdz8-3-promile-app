import React, { Component } from 'react'

class ListItem extends Component {

  handleRevertView = () => {
    this.props.revertView()
  };

  handleClickCallback = (data) => {
    this.props.handleCallback(data);
    };

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



