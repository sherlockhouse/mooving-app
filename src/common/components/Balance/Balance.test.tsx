// components/Hello.tsx
import React from 'react';
import renderer from 'react-test-renderer';

import { Balance } from '../Balance';

it('renders correctly with defaults', () => {
  const view = renderer
    .create(<Balance 
      balance={1}
      onIncrement={ () => {} }
      onDecrement={ () => {} }
    />)
    .toJSON();
  expect(view).toMatchSnapshot();
});