import * as React from 'react';
import { render } from '@testing-library/react';

import { AuthMessage } from '..';

describe('<AuthMessage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AuthMessage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
