import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Pontos from '../pages/Pontos';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/pontos' component={Pontos} />
  </Switch>
);

export default Routes;
