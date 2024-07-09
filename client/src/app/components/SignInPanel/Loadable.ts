/**
 *
 * Asynchronously loads the component for SignInPanel
 *
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
