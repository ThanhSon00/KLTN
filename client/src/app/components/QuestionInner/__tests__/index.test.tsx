import * as React from 'react';
import { render } from '@testing-library/react';

import { QuestionInner } from '..';

describe('<QuestionInner  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<QuestionInner />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
