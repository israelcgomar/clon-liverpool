import React, { Component } from 'react'

import { Navbar } from './Navbar/Navbar'
import UiPrivateRouter from './UiPrivateRouter'
// import img from '../../assets/img/pub2.png'
/* Styles */
import './UiPrivate.sass';

export default class UiPrivate extends Component {
  render() {
    return (
      <div className="UiPrivate">
        <div className="nav-bar">
          <Navbar/>
        </div>
        <div className='content__main'>
          <div className='content__router'>
            <UiPrivateRouter/>
            <div className='wrapper'>
            </div>
          </div>
        </div>
      </div>
    );    
  }
}