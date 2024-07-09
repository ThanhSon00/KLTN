/**
 *
 * Asynchronously loads the component for LogOutButton
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LogOutButton = lazyLoad(
  () => import('./index'),
  module => module.LogOutButton,
);
