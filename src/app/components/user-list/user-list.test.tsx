import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { buildGlobalFetchSpy, buildSampleMockData } from '../../util/util';

import UserList from './user-list';

let container: HTMLDivElement | null = null;

describe('<UserList />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  describe('componentDidMount', () => {
    test('if display the list on successful fetch w/data', async () => {
      buildGlobalFetchSpy({
        ok: true,
        json: () => Promise.resolve(buildSampleMockData()),
      } as Response);

      await act(async () => {
        render(<UserList />, container);
      });

      expect(container?.querySelector('header')).toBeInTheDocument();
      expect(container?.querySelector('main')).toBeInTheDocument();
    });

    test('if display the empty list message on successful fetch w/o data', async () => {
      buildGlobalFetchSpy({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response);

      await act(async () => {
        render(<UserList />, container);
      });

      const empltyListMessage = screen.getByText(/User list is empty/i);
      expect(empltyListMessage).toBeInTheDocument();
    });

    test('if display error message on failing fetch request', async () => {
      buildGlobalFetchSpy({
        ok: false,
        json: () => Promise.resolve([]),
      } as Response);

      await act(async () => {
        render(<UserList />, container);
      });

      expect(container?.querySelector('.error-message')).toBeInTheDocument();
    });
  });
});
