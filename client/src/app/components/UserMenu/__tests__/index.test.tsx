import * as React from 'react';
import { render } from '@testing-library/react';

import { UserMenu } from '..';

describe('<UserMenu  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserMenu />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
