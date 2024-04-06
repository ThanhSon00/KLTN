import * as React from 'react';
import { render } from '@testing-library/react';

import { CheckResetPasswordToken } from '..';

describe('<CheckResetPasswordToken  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<CheckResetPasswordToken />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
