import * as React from 'react';
import { render } from '@testing-library/react';

import { AlertMessage } from '..';

describe('<AlertMessage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AlertMessage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
