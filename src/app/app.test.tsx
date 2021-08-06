import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './app';

let container: HTMLDivElement | null = null;

describe('<App />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(<App />, container);
    });
  });
  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the app', () => {
    const appRoot = container?.querySelector('.team-users-app');
    expect(appRoot).toBeInTheDocument();
  });
});
