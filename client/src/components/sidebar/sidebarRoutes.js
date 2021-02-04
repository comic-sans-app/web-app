import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Templates, Elements, Characters } from './Pages';

const Routes = () => {
  return (
    <Switch>
      <Route path='/templates' component={Templates} />
      <Routes path='/characters' component={Characters} />
      <Routes path='/elements' component={Elements} />
    </Switch>
  );
};

export default Routes;
