import React, { Component } from 'react'

class ListItem extends Component {

  handleRevertView = () => {
    this.props.revertView()
  };

  handleClickCallback = (data) => {
    this.props.handleCallback(data);
    console.log(this.props.eventClicked)
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
              {this.props.eventClicked !== '' ?
                <button onClick={this.handleRevertView}>Back</button>
                : false
              }
            </li>
            )}
          </ul>
        </div>
      )
    }
}

export default ListItem



