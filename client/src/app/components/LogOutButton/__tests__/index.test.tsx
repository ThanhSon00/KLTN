import * as React from 'react';
import { render } from '@testing-library/react';

import { LogOutButton } from '..';

describe('<LogOutButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LogOutButton />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
