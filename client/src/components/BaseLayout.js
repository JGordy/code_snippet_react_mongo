import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class BaseLayout extends Component {
  render() {
    return (
      <div className='BaseLayout'>
        <nav className="nav">
          <NavLink activeClassName="selected" exact to='/'>Snippety
          </NavLink>
          <NavLink activeClassName="selected" exact to='/'>Snippets
          </NavLink>
        </nav>
        <div className="">
          {this.props.children}
        </div>
      </div>
    );
  }
};
