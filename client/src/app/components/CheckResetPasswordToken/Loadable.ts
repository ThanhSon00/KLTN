/**
 *
 * Asynchronously loads the component for CheckResetPasswordToken
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CheckResetPasswordToken = lazyLoad(
  () => import('./index'),
  module => module.CheckResetPasswordToken,
);
