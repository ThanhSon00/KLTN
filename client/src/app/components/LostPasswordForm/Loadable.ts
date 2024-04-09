/**
 *
 * Asynchronously loads the component for LostPasswordForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LostPasswordForm = lazyLoad(
  () => import('./index'),
  module => module.LostPasswordForm,
);
