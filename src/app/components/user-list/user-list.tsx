import { Component, createRef, RefObject } from 'react';
import SearchFilter from './search-filter/search-filter';
import UserListItem from './user-list-item/user-list-item';
import ErrorBoundary from '../shared/error-boundary';
import Spinner from '../shared/spinner/spinner';
import {
  UserListState,
  User,
  USERS_API_URL,
  FILTER_FIELD,
} from '../../app.definition';

import style from './user-list.module.scss';

class UserList extends Component<Record<string, unknown>, UserListState> {
  searchFieldRef = createRef<HTMLInputElement>();
  listItemRef: RefObject<HTMLLIElement>[] = [];

  state = {
    userList: [],
    currentFilter: FILTER_FIELD.NAME,
    filterTerm: '',
    error: null,
    isLoading: true,
  } as UserListState;

  componentDidMount() {
    this._fetchUserList();
  }

  private _fetchUserList() {
    fetch(USERS_API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          this.setState({
            error: 'Error from the response.',
            isLoading: false,
          });
        }
      })
      .then((data) => {
        data.forEach(() => this.listItemRef.push(createRef<HTMLLIElement>()));
        this.setState({ userList: data, isLoading: false });
      })
      .catch(() =>
        this.setState({
          error: 'Something went wrong, please check your connection',
          isLoading: false,
        })
      );
  }

  private _onSearch = (term: string) => {
    this.setState({ filterTerm: term });
  };

  private _applyFilter = (user: User) => {
    const { filterTerm, currentFilter } = this.state;
    return currentFilter === FILTER_FIELD.NAME && !!filterTerm
      ? user.name.includes(filterTerm)
      : currentFilter === FILTER_FIELD.EMAIL && !!filterTerm
      ? user.email.includes(filterTerm)
      : currentFilter === FILTER_FIELD.COMPANY && !!filterTerm
      ? user.company.name.includes(filterTerm)
      : user;
  };

  private _onFilterOptionChange = (filterField: FILTER_FIELD) =>
    this.setState({ currentFilter: filterField });

  private _renderList(userList: User[]) {
    const list = userList.filter(this._applyFilter);
    return (
      <>
        {list.length ? (
          <ul className={style['user-list']}>
            {list.map((user, i) => {
              return (
                <ErrorBoundary key={user.id}>
                  <UserListItem
                    listItemRef={this.listItemRef[i]}
                    searchFieldRef={this.searchFieldRef}
                    filterBy={this.state.currentFilter}
                    term={this.state.filterTerm}
                    data={user}
                  />
                </ErrorBoundary>
              );
            })}
          </ul>
        ) : (
          <em>Please try different search term.</em>
        )}
      </>
    );
  }

  private _renderContent(userList: User[]) {
    return (
      <>
        <header>
          <ErrorBoundary>
            <SearchFilter
              onSearch={this._onSearch}
              firstListItemRef={this.listItemRef[0]}
              searchFieldRef={this.searchFieldRef}
              onFilterOptionChange={this._onFilterOptionChange}
            />
          </ErrorBoundary>
        </header>
        <main>{this._renderList(userList)}</main>
      </>
    );
  }

  render() {
    const { userList, error, isLoading } = this.state;
    if (userList?.length) {
      return this._renderContent(userList);
    }
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <em className='error-message'>{error}</em>;
    }
    return <em>User list is empty ..</em>;
  }
}

export default UserList;
