import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="links-container">
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          <div>•</div>
          <NavLink className="nav-link" to="/how-to-start">
            How to start
          </NavLink>
          <div>•</div>
          <NavLink className="nav-link" to="/library">
            Library
          </NavLink>
          <div>•</div>
          <NavLink className="nav-link" to="/grant">
            Grant
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Footer;
