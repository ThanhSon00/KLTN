import * as React from 'react';
import { render } from '@testing-library/react';

import { PanelSubmitButton } from '..';

describe('<PanelSubmitButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PanelSubmitButton />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
