import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

interface NavBarButtonProps {
  icon:string,
  text:string,
  to:string,
  align?:string
}

class NavBarButton extends React.Component<NavBarButtonProps, {}> {
  render() {
    return (
      <NavLink className={({ isActive }) => (isActive ? "navbar-link-active" : "navbar-link")} to={this.props.to}>
        <div className="navbar-menu">
          <img className="navbar-icon" src={this.props.icon}></img>
          <div className="navbar-text">{this.props.text}</div>
        </div>
      </NavLink>
    );
  }
}

export default NavBarButton;