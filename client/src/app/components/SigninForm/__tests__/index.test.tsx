import * as React from 'react';
import { render } from '@testing-library/react';

import { SigninForm } from '..';

describe('<SigninForm  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SigninForm />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
