/**
 *
 * Asynchronously loads the component for AuthMessage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AuthMessage = lazyLoad(
  () => import('./index'),
  module => module.AuthMessage,
);
