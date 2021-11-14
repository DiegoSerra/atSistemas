import { Switch, Route } from 'react-router-dom';

import { getComponent, getDefault } from '@breakingbad/utils/RouterFactory';

const Router = () => {
  return (
    <Switch>
      {/* Common routes */}
      <Route exact path='/' component={getComponent('landing')} />
      <Route path='/characters/:id' component={getComponent('character')} />
      <Route path='/callback' component={getComponent('callback')} />
      <Route path='/bad-request' component={getComponent('bad_request')} />
      <Route path='/forbidden' component={getComponent('forbidden')} />
      <Route path='/server-error' component={getComponent('internal_server_error')} />
      <Route path='/unauthorized' component={getComponent('unauthorized')} />

      {/* Styleguide route, just for developing and not accessible via navigation */}
      {process.env.NODE_ENV === 'development' && <Route path='/styleguide' component={getComponent('styleguide')} />}

      {/* This component does not have path to act as the fallback when no matching route is found */}
      <Route component={getDefault()} />

    </Switch>
  );
};

export default Router;
