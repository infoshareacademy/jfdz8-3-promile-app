import React, { Component } from 'react';
import './EventTags.css'

class EventTags extends Component {
  render() {
    return (
      <div className="tags-container">
        { this.props.tags &&
          this.props.tags.map((tag, index) => {
            return <span
                      key={index}
                      className="tag"
                  >
                  #{tag}
                  </span>
          })
        }
      </div>
    )
  }
}

export default EventTags
