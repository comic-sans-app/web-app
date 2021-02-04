import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Templates from './Templates';

const Routes = () => {
  return (
    <Switch>
      <Route path='/templates' component={Templates} />
    </Switch>
  );
};

export default Routes
