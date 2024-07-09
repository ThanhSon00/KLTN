/**
 *
 * Asynchronously loads the component for SignUpPanel
 *
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
