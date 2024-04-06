import * as React from 'react';
import { render } from '@testing-library/react';

import { PanelFooter } from '..';

describe('<PanelFooter  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PanelFooter />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
