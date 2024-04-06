/**
 *
 * Asynchronously loads the component for LostPasswordPanel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LostPasswordPanel = lazyLoad(
  () => import('./index'),
  module => module.LostPasswordPanel,
);
