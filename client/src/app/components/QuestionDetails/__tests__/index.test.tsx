import * as React from 'react';
import { render } from '@testing-library/react';

import { QuestionDetails } from '..';

describe('<QuestionDetails  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<QuestionDetails />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
