import { createRouterFactory } from '@breakingbad/utils/RouterFactory'
import { lazy } from 'react';

createRouterFactory(
  [
    { componentKey: 'bad_request', componentLazyModule: lazy(() => import('./ErrorPages/BadRequest')) },
    { componentKey: 'forbidden', componentLazyModule: lazy(() => import('./ErrorPages/Forbidden')) },
    { componentKey: 'server_error', componentLazyModule: lazy(() => import('./ErrorPages/ServerError')),},
    { componentKey: 'unauthorized', componentLazyModule: lazy(() => import('./ErrorPages/Unauthorized')) },
    { componentKey: 'landing', componentLazyModule: lazy(() => import('./Landing')) },
    { componentKey: 'character', componentLazyModule: lazy(() => import('./Character')) },
  ],
  lazy(() => import('./ErrorPages/NotFound'))
);
