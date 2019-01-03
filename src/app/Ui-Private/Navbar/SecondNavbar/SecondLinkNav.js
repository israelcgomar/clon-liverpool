import React from 'react';
import { Route, Link } from 'react-router-dom';
import './SecondLinkNav.sass';


export const SecondLinkNav =({ to, activeElement, icon, text }) => {
  return(
    <Route
        path={to}
        className='link-elment-second-nav'
        exact={activeElement}
        children={({ match }) => {
    return (
    <div className='link-elment-second-nav'>
        <li className={`item ${match ? "active" : ""}`} >
            <Link to={to}>
                <i className={icon}></i>
                <span>{text}</span>
            </Link>
        </li>
    </div>
    )}
  }
  />
  );
}