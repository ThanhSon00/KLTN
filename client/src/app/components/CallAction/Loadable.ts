/**
 *
 * Asynchronously loads the component for CallAction
 *
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
