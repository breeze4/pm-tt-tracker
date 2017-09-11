import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

import '../App.css';
import './Navigation.css';

import config from '../Config.js';
const { appData: { navigation } } = config;

const NESTED_ROUTES = ['trainer', 'pokemon', 'pokedex'];

class Navigation extends Component {
  render() {
    const navigationLinks = navigation ? navigation.map(({ path, name }) => {
      return (
        <li key={path}
          className="navbar-item">
          <Link isActive={(match, location) => {
            return this.isActive(path, name, match, location);
          }} exact={true} to={`/${path}`}>{name}</Link>
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

  isActive(path, name, match, location) {
    if (path && location) {
      return location.pathname.includes(path);
    } else {
      return false;
    }
  }
}

export default Navigation;
