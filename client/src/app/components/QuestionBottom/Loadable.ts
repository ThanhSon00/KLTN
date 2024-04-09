/**
 *
 * Asynchronously loads the component for QuestionBottom
 *
 */

import { lazyLoad } from 'utils/loadable';

export const QuestionBottom = lazyLoad(
  () => import('./index'),
  module => module.QuestionBottom,
);
