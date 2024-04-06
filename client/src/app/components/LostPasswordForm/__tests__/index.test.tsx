import * as React from 'react';
import { render } from '@testing-library/react';

import { LostPasswordForm } from '..';

describe('<LostPasswordForm  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LostPasswordForm />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
