import React, { Component } from 'react'

class BottomBar extends Component {

  state = {
    whichTechnologyLogoClicked: ''
  }

  handleIdOfClickedLogo = (id) => {
    this.setState({
        whichTechnologyLogoClicked : id
    })
      console.log(id)
  }

  render () {
    return (
      <div className="bottom_bar">
        <div className="bottom_bar-technology-logo-container">
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Angular")}>
              <img alt="logo" src={require("../../images/tech_icons/angular_logo.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Cplus")}>
              <img alt="logo" src={require("../../images/tech_icons/c_plus_logo.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("SQL")}>
              <img alt="logo" src={require("../../images/tech_icons/database_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("GameDev")}>
              <img alt="logo" src={require("../../images/tech_icons/game_dev_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Html")}>
              <img alt="logo" src={require("../../images/tech_icons/html_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Java")}>
              <img alt="logo" src={require("../../images/tech_icons/java_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("JavaScript")}>
              <img alt="logo" src={require("../../images/tech_icons/js_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Node")}>
              <img alt="logo" src={require("../../images/tech_icons/node_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("PHP")}>
              <img alt="logo" src={require("../../images/tech_icons/php_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Python")}>
              <img alt="logo" src={require("../../images/tech_icons/python_icon.png")}/>
          </span>
          <span className="bottom_bar-technology-logo-item" onClick={()=> this.handleIdOfClickedLogo("Ruby")}>
              <img alt="logo" src={require("../../images/tech_icons/ruby_icon.png")}/>
          </span>
        </div>
      </div>
    )
  }
}

export default BottomBar