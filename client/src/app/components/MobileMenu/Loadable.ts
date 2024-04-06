/**
 *
 * Asynchronously loads the component for MobileMenu
 *
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
