import React from 'react';
import NavBarButton from './NavBarButton';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

interface NavBarProps {
}

class NavBar extends React.Component<NavBarProps, {}> {
  render() {
    return (
      <div className="navbar">
        <NavLink className="navbar-logo" to="/">
          BABEL UNIVERSE
        </NavLink>
        
        <div className="action-container">
          <NavBarButton icon="/edit.png" text="Writing" to="/writing" />
          <NavBarButton icon="/wallet.png" text="Connect Wallet" to="/users" />
          <NavBarButton icon="/en.png" text="EN" to="/shop" />
        </div>
      </div>
    );
  }
}

export default NavBar;