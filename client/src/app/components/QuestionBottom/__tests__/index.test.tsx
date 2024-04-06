import * as React from 'react';
import { render } from '@testing-library/react';

import { QuestionBottom } from '..';

describe('<QuestionBottom  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<QuestionBottom />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
