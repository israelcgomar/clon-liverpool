import React, { Component } from 'react'
import { Route } from "react-router-dom";

import newArticles from '../Allarticles/Articles'
import Allarticles from '../Allarticles/allArticles';
import Articles from "../Articles/Articles";

export default class UiPrivateRouter extends Component {
  render() {
    return <div className="UiPrivateRouter wrapper">
        <Route exact path="/" component={Articles} />
        <Route exact path="/newArticles" component={newArticles} />
        <Route exact path="/articles" component={Articles} />
        <Route exact path="/all-articles" component={Allarticles} />
      </div>;          
  } 
}