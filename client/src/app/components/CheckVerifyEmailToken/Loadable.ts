/**
 *
 * Asynchronously loads the component for CheckVerifyEmailToken
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CheckVerifyEmailToken = lazyLoad(
  () => import('./index'),
  module => module.CheckVerifyEmailToken,
);
