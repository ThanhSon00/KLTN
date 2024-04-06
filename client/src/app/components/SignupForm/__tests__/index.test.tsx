import * as React from 'react';
import { render } from '@testing-library/react';

import { SignupForm } from '..';

describe('<SignupForm  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SignupForm />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
