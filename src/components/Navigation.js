import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';

import '../App.css';

import config from '../Config.js';
const { appData: { navigation } } = config;

class Navigation extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-section">
          <p className="navbar-brand">PokeTop</p>
        </div>
        <div className="navbar-section">
          <ul className="nav">
            {navigation ? navigation.map(({ path, name }) => {
              return (
                <li key={path}
                  className="nav-item h6">
                  <Link isActive={(match, location) => {
                    return this.isActive(path, name, match, location);
                  }} exact={true} to={`/${path}`}>{name}</Link>
                </li>
              )
            }) : null}
          </ul>
        </div>
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
