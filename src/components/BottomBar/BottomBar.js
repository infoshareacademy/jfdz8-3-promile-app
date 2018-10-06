import React, { Component } from 'react'
import Logo from "../../images/logo/LOGO1.png";

class BottomBar extends Component {

  handleIdOfClickedLogo = (technology) => {
      this.props.getEvents()
      this.props.getClickedLogoTechnology(technology)
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
            <div className="bottom_bar_logos">
                <a target="_blank" rel="noopener noreferrer" href="http://www.3-promile.jfdz8.is-academy.pl/">
                    <img src={Logo} alt="wizytowka"/>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://infoshareacademy.com/">
                    <img src="https://avatars2.githubusercontent.com/u/14171731?s=280&v=4" alt="infoshare logo"/>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/infoshareacademy/jfdz8-3-promile-app">
                    <img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" alt="github repo"/>
                </a>
            </div>
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