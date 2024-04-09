import * as React from 'react';
import { render } from '@testing-library/react';

import { TextEditor } from '..';

describe('<TextEditor  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TextEditor />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
