import { RefObject } from 'react';

export type PropsFunction = (t?: any) => void;

export enum KEYBORD_KEY {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_LEFT = 'ArrowLeft',
  ENTER = 'Enter',
}

export enum FILTER_FIELD {
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  COMPANY = 'COMPANY',
}

export interface UserListState {
  userList: User[];
  currentFilter: FILTER_FIELD;
  filterTerm: string;
  error: string | null;
  isLoading: boolean;
}

export interface UserListItemDef {
  listItemRef: RefObject<HTMLLIElement>;
  searchFieldRef: RefObject<HTMLInputElement>;
  filterBy: FILTER_FIELD;
  data: User;
  term: string;
}

export interface SearchFilterDef {
  onSearch: PropsFunction;
  onFilterOptionChange: PropsFunction;
  firstListItemRef: RefObject<HTMLLIElement>;
  searchFieldRef: RefObject<HTMLInputElement>;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

export interface GeoLocation {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
export const GOOGLE_KEY = 'AIzaSyBBE99qgxGPUK3rJY5YQGLvTIMpnxr4qok';
