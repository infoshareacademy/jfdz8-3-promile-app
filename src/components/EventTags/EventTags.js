import React, { Component } from 'react';

class EventTags extends Component {
  render() {
    return (
      <div>
        {
          this.props.tags.map(tag => {
            return <span> {tag} </span>
          })
        }
      </div>
    )
  }
}

export default EventTags

