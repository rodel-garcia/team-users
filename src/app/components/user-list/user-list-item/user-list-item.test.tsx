import { createRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { FILTER_FIELD, UserListItemDef } from '../../../app.definition';
import { buildSampleMockData } from '../../../util/util';

import UserListItem from './user-list-item';

let container: HTMLDivElement | null = null;

const userListAttr = {
  listItemRef: createRef<HTMLLIElement>(),
  searchFieldRef: createRef<HTMLInputElement>(),
  data: buildSampleMockData()[0],
  filterBy: FILTER_FIELD.NAME,
  term: '',
} as UserListItemDef;

describe('<UserListItem />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(<UserListItem {...userListAttr} />, container);
    });
  });
  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the list item,', () => {
    const itemDetails = container?.querySelector('.list-item');
    expect(itemDetails).toBeInTheDocument();
  });

  test('if it render the user info section', () => {
    const listItem = container?.querySelector('.user-info');
    expect(listItem).toBeInTheDocument();
  });

  test('if it render the personal details section', () => {
    const listItem = container?.querySelector('.personal-details');
    expect(listItem).toBeInTheDocument();
  });

  test('if it render the company-details section', () => {
    const listItem = container?.querySelector('.company-details');
    expect(listItem).toBeInTheDocument();
  });

  test('if it render the call button', () => {
    (container?.querySelector('.list-item') as HTMLLIElement).click();
    expect(container?.querySelector('.call-button')).toBeInTheDocument();
  });
});
