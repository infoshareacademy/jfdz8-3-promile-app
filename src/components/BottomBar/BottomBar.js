import React, { Component } from 'react'

class BottomBar extends Component {
  render () {
    return (
      <div className="bottom_bar">
        <div className="bottom_bar_credits-container">

        </div>
        <div className="bottom_bar-technology-logo-container">
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/angular_logo.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/c_plus_logo.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/database_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/game_dev_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/html_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/java_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/js_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/node_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/php_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/python_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/ruby_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/css_icon.png")} /></span>
          <span className="bottom_bar-technology-logo-item"><img src={require("../../images/tech_icons/react_icon.png")} /></span>
        </div>
      </div>
    )
  }
}

export default BottomBar