import * as React from 'react';
import { render } from '@testing-library/react';

import { LostPasswordPanel } from '..';

describe('<LostPasswordPanel  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LostPasswordPanel />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
