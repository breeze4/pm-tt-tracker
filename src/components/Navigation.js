import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

import '../App.css';
import './Navigation.css';


import config from '../Config.js';
const { appData: { navigation } } = config;

class Navigation extends Component {
  render() {
    const navigationLinks = navigation ? navigation.map(({ path, name }) => {
      return (
        <li key={path}
          className="navbar-item">
          <Link exact={true} to={`/${path}`}>{name}</Link>
        </li>
      )
    }) : null;
    return (
      <div className="nav sansserif">
        <ul className="navbar">
          {navigationLinks}
        </ul>
      </div>
    );
  }
}

export default Navigation;
