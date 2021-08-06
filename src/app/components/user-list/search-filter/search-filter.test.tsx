import { createRef } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { SearchFilterDef, PropsFunction } from '../../../app.definition';

import SearchFilter from './search-filter';

let container: HTMLDivElement | null = null;

const searchFilterAttr = {
  onSearch: () => {},
  onFilterOptionChange: () => {},
  firstListItemRef: createRef<HTMLLIElement>(),
  searchFieldRef: createRef<HTMLInputElement>(),
} as SearchFilterDef;

describe('<UserListItem />', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(<SearchFilter {...searchFilterAttr} />, container);
    });
  });
  afterEach(() => {
    unmountComponentAtNode(container as HTMLDivElement);
    container?.remove();
    container = null;
  });

  test('if it render the filter fields', () => {
    const filterOptions = container?.querySelector('.filter-option');
    expect(filterOptions).toBeInTheDocument();
  });

  test('if it render the nameFilter field', () => {
    const nameFilter = container?.querySelector('#nameFilter');
    expect(nameFilter).toBeInTheDocument();
  });

  test('if it render the emailFilter field', () => {
    const emailFilter = container?.querySelector('#emailFilter');
    expect(emailFilter).toBeInTheDocument();
  });

  test('if it render the companyFilter field', () => {
    const companyFilter = container?.querySelector('#companyFilter');
    expect(companyFilter).toBeInTheDocument();
  });
});
