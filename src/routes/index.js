import React from "react";
// import TagManager from 'react-gtm-module'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  StaticRouter
} from "react-router-dom";

import routes from '../routes/routes';

export default ({ server, location, context }) => {
    const routesMap = routes.map((route, i) => <Route key={i} {...route} />);

    // Client Router
    let router = (
        <Router>
            <Switch>
                {routesMap}
            </Switch>
        </Router>
    );

    // Server Router
    if (server) {
        router = (
            <StaticRouter location={location} context={context}>
                    <Switch>
                        {routesMap}
                    </Switch>
             </StaticRouter>            
        );
    }

    return (
        <div>
            {router}
        </div>        
    );
};
