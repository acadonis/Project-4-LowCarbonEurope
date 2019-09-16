import React from 'react'
import {Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      navbarOpen: false

    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar(){
    this.setState({navbarOpen: !this.state.navbarOpen})

  }
  render(){
    return(
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link to= "/" className="navbar-item"> Home </Link>
            <a role="button" className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''} ` } onClick={this.toggleNavbar}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''} ` }>
          </div>
        </div>
      </nav>
    )
  }



}


export default withRouter(Navbar)
