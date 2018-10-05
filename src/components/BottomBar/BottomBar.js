import React, { Component } from 'react'

class BottomBar extends Component {

  handleIdOfClickedLogo = (technology) => {
    this.props.getEvents()
      this.props.getClickedLogoTechnology(technology);
      console.log(technology)
  }

  render () {
      const logotypes = [
          {technology: 'Angular', logo: 'angular_logo.png'},
          {technology: 'Cplus', logo: 'c_plus_logo.png'},
          {technology: 'SQL', logo: 'database_icon.png'},
          {technology: 'GameDev', logo: 'game_dev_icon.png'},
          {technology: 'Html', logo: 'html_icon.png'},
          {technology: 'Java', logo: 'java_icon.png'},
          {technology: 'JavaScript', logo: 'js_icon.png'},
          {technology: 'Node', logo: 'node_icon.png'},
          {technology: 'PHP', logo: 'php_icon.png'},
          {technology: 'Python', logo: 'python_icon.png'},
          {technology: 'Ruby', logo: 'ruby_icon.png'},
          {technology: 'React', logo: 'react_icon.png'},
          {technology: 'CSS', logo: 'css_icon.png'}
          ]
    return (
      <div className="bottom_bar">
        <div className="bottom_bar_credits-container">

        </div>
          <div className="bottom_bar-technology-logo-container">
              { logotypes.map( ({ technology, logo }) => (
                  <span className="bottom_bar-technology-logo-item"
                        onClick={()=> this.handleIdOfClickedLogo(technology)}
                  >
      <img alt="logo" src={require(`../../images/tech_icons/${logo}`)}/>
    </span>
              ))}
          </div>
      </div>
    )
  }
}

export default BottomBar