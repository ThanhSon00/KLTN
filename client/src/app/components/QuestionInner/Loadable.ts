/**
 *
 * Asynchronously loads the component for QuestionInner
 *
 */

import { lazyLoad } from 'utils/loadable';

export const QuestionInner = lazyLoad(
  () => import('./index'),
  module => module.QuestionInner,
);
