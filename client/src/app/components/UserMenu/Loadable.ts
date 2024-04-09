/**
 *
 * Asynchronously loads the component for UserMenu
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserMenu = lazyLoad(
  () => import('./index'),
  module => module.UserMenu,
);
