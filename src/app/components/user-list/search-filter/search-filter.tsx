import React, {
  ChangeEvent,
  ChangeEventHandler,
  createRef,
  KeyboardEvent,
  KeyboardEventHandler,
  RefObject,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import style from './search-filter.module.scss';
import {
  FILTER_FIELD,
  KEYBORD_KEY,
  SearchFilterDef,
} from '../../../app.definition';

const SearchFilter: React.FC<SearchFilterDef> = ({
  onSearch,
  onFilterOptionChange,
  firstListItemRef,
  searchFieldRef,
}) => {
  const [currentFilter, setFilter] = useState(FILTER_FIELD.NAME);
  const [placeHolder, setPlaceholder] = useState('Search by name ..');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const firstRadioButtonRef = createRef<HTMLInputElement>();

  const handleFilterFieldKeyDown = (event: KeyboardEvent) => {
    if (event.key === KEYBORD_KEY.ARROW_DOWN) {
      firstListItemRef.current?.focus();
    }
    if (event.key === KEYBORD_KEY.ARROW_UP) {
      const selectedField = firstRadioButtonRef.current;
      const filterField = selectedField?.value;
      selectedField?.focus();
      updateOptionFieldState(filterField as FILTER_FIELD);
      onFilterOptionChange(filterField);
      onSearch('');
    }
  };

  const handleFilterOptionKeyDown = (event: KeyboardEvent) => {
    if (event.key === KEYBORD_KEY.ARROW_DOWN) {
      searchFieldRef.current?.focus();
    }
  };

  const handleFilterOptionOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filterField = event.target.value as FILTER_FIELD;
    updateOptionFieldState(filterField);
    onFilterOptionChange(filterField);
    onSearch('');
  };

  const updateOptionFieldState = (filterField: FILTER_FIELD) => {
    const placeholder = `Search by ${filterField.toLocaleLowerCase()} ..`;
    setFilter(filterField);
    setPlaceholder(placeholder);
    setSearchTerm('');
  };

  return (
    <>
      <div className={style['filter-option']}>
        <strong>Filter: </strong>
        <RadioButtonField
          id='nameFilter'
          value={FILTER_FIELD.NAME}
          checked={currentFilter === FILTER_FIELD.NAME}
          refobject={firstRadioButtonRef}
          onChange={handleFilterOptionOnChange}
          onKeyDown={handleFilterOptionKeyDown}
        />
        <RadioButtonField
          id='emailFilter'
          value={FILTER_FIELD.EMAIL}
          checked={currentFilter === FILTER_FIELD.EMAIL}
          onChange={handleFilterOptionOnChange}
          onKeyDown={handleFilterOptionKeyDown}
        />
        <RadioButtonField
          id='companyFilter'
          value={FILTER_FIELD.COMPANY}
          checked={currentFilter === FILTER_FIELD.COMPANY}
          onChange={handleFilterOptionOnChange}
          onKeyDown={handleFilterOptionKeyDown}
        />
      </div>
      <div className={style['search-field']}>
        <input
          tabIndex={0}
          type='text'
          value={searchTerm}
          placeholder={placeHolder}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const term = event.target.value;
            setSearchTerm(term);
            onSearch(term);
          }}
          onKeyDown={handleFilterFieldKeyDown}
          ref={searchFieldRef}
          autoFocus
        />
        <FontAwesomeIcon className={style['search-icon']} icon={faSearch} />
      </div>
    </>
  );
};

export default SearchFilter;

const RadioButtonField: React.FC<{
  id: string;
  value: FILTER_FIELD;
  checked: boolean;
  refobject?: RefObject<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler;
}> = (attr) => {
  const customAttr = {
    ...attr,
    ref: attr.refobject || createRef<HTMLInputElement>(),
  };
  return (
    <div>
      <input tabIndex={0} type='radio' name='filterOption' {...customAttr} />
      <label htmlFor={attr.id}>{attr.value.toLowerCase()}</label>
    </div>
  );
};
