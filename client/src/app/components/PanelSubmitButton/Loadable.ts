/**
 *
 * Asynchronously loads the component for PanelSubmitButton
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PanelSubmitButton = lazyLoad(
  () => import('./index'),
  module => module.PanelSubmitButton,
);
