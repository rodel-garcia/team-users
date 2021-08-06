import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('<Spinner />', () => {
  test('if it render the spinner', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.lds-facebook')?.childElementCount).toBe(3);
  });
});
