/**
 *
 * Asynchronously loads the component for SigninForm
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SigninForm = lazyLoad(
  () => import('./index'),
  module => module.SigninForm,
);
