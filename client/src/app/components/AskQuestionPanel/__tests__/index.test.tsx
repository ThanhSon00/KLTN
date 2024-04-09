import * as React from 'react';
import { render } from '@testing-library/react';

import { AskQuestionPanel } from '..';

describe('<AskQuestionPanel  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AskQuestionPanel />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
