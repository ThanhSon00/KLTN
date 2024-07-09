/**
 *
 * Asynchronously loads the component for AlertMessage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AlertMessage = lazyLoad(
  () => import('./index'),
  module => module.AlertMessage,
);
