import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

import './Navigation.css';

import config from '../Config.js';
const { appData: { navigation } } = config;

class Navigation extends Component {
  render() {
    const navigationLinks = navigation ? navigation.map(({ path, name }) => {
      return (
        <li key={path}
          className="Navigation-item">
          <Link exact={true} to={`/${path}`}>{name}</Link>
        </li>
      )
    }) : null;
    return (
      <div className="Navigation">
        navigation
        <ul className="Navigation-list">
          {navigationLinks}
        </ul>
      </div>
    );
  }
}

export default Navigation;
