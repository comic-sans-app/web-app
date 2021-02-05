import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Templates, Elements, Characters } from './Pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/templates' component={Templates} />
      <Route exact path='/characters' component={Characters} />
      <Route exact path='/elements' component={Elements} />
    </Switch>
  );
};

export default Routes;
