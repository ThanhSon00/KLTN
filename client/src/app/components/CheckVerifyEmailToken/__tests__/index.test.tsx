import * as React from 'react';
import { render } from '@testing-library/react';

import { CheckVerifyEmailToken } from '..';

describe('<CheckVerifyEmailToken  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<CheckVerifyEmailToken />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
