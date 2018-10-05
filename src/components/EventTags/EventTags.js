import React, { Component } from 'react';
import './EventTags.css'

class EventTags extends Component {
  render() {
    return (
      <div className="tags-container">
        { this.props.tags &&
          this.props.tags.map((tag, index) => {
            return <div
                      key={index}
                      className="tag"
                  >
                  #{tag}
                  </div>
          })
        }
      </div>
    )
  }
}

export default EventTags
