/**
 *
 * Asynchronously loads the component for MainContent
 *
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
