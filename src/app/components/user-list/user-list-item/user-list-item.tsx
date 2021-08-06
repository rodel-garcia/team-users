import React, { KeyboardEvent, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

import {
  Company,
  User,
  KEYBORD_KEY,
  GeoLocation,
  Address,
  GOOGLE_KEY,
  FILTER_FIELD,
  UserListItemDef,
} from '../../../app.definition';

import style from './user-list-item.module.scss';

const UserListItem: React.FC<UserListItemDef> = ({
  listItemRef,
  searchFieldRef,
  filterBy,
  data,
  term,
}) => {
  const [showDetail, toggleDetail] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLLIElement | HTMLButtonElement>
  ) => {
    const { previousElementSibling, nextElementSibling } =
      event.target as HTMLElement;
    switch (event?.key) {
    case KEYBORD_KEY.ARROW_UP:
      previousElementSibling
        ? (previousElementSibling as HTMLLIElement)?.focus()
        : searchFieldRef.current?.focus();
      break;
    case KEYBORD_KEY.ARROW_DOWN:
      buttonRef.current
        ? buttonRef.current?.focus()
        : (nextElementSibling as HTMLLIElement)?.focus();
      break;
    case KEYBORD_KEY.ARROW_RIGHT:
      toggleDetail(!showDetail);
      break;
    case KEYBORD_KEY.ENTER:
      buttonRef.current && buttonRef.current === document.activeElement
        ? triggerCallButton()
        : toggleDetail(!showDetail);
      break;
    default:
      break;
    }
  };

  const triggerCallButton = () =>
    alert(`Event for calling ${data.name} triggered.`);

  return (
    <li
      className={style['list-item']}
      onKeyDown={handleKeyDown}
      onClick={() => toggleDetail(!showDetail)}
      tabIndex={0}
      ref={listItemRef}
    >
      <ItemDetails data={data} filterTerm={term} filterBy={filterBy} />
      {showDetail && (
        <button
          className={style['call-button']}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={triggerCallButton}
          ref={buttonRef}
        >
          <FontAwesomeIcon icon={faPhoneAlt} />
          <span>Call: {data.phone}</span>
        </button>
      )}
    </li>
  );
};

export default UserListItem;

const ItemDetails: React.FC<{
  data: User;
  filterTerm: string;
  filterBy: FILTER_FIELD;
}> = ({ data, filterTerm, filterBy }) => {
  return (
    <div className={style['user-info']}>
      <section>
        <PersonalDetails
          data={data}
          filterTerm={filterTerm}
          filterBy={filterBy}
        />
        <CompanyDetails
          data={data.company}
          filterTerm={filterTerm}
          filterBy={filterBy}
        />
        <AddressDetails address={data.address} />
      </section>
    </div>
  );
};

const PersonalDetails: React.FC<{
  data: User;
  filterTerm: string;
  filterBy: FILTER_FIELD;
}> = ({ data, filterTerm, filterBy }) => (
  <div className={style['personal-details']}>
    <div className={style['avatar']}>
      <FontAwesomeIcon icon={faUser} />
    </div>
    <div>
      {filterTerm && filterBy === FILTER_FIELD.NAME ? (
        <h3
          className={style['highlighted']}
          dangerouslySetInnerHTML={{
            __html: data.name.replace(filterTerm, `<span>${filterTerm}</span>`),
          }}
        ></h3>
      ) : (
        <h3>{data.name}</h3>
      )}
      <address>
        <FieldValuePairs text='Username' value={data.username} />
        <FieldValuePairs
          text='Email'
          value={data.email}
          type='email'
          filterTerm={filterTerm}
          filterBy={filterBy}
        />
        <FieldValuePairs text='Website' value={data.website} type='website' />
        <FieldValuePairs text='Phone' value={data.phone} type='phone' />
      </address>
    </div>
  </div>
);

const CompanyDetails: React.FC<{
  data: Company;
  filterTerm: string;
  filterBy: FILTER_FIELD;
}> = ({ data, filterTerm, filterBy }) => (
  <div className={style['company-details']}>
    <h4>Company Details</h4>
    <FieldValuePairs
      text='Name'
      value={data.name}
      type='text'
      filterTerm={filterTerm}
      filterBy={filterBy}
    />
    <FieldValuePairs text='Business' value={data.bs} />
    <FieldValuePairs text='Catch Phrase' value={data.catchPhrase} />
  </div>
);

const AddressDetails: React.FC<{ address: Address }> = ({ address }) => (
  <div className={`${style['address-details']}`}>
    <div>
      <h4>Personal Address</h4>
      <address>
        <FieldValuePairs text='Suite' value={address.suite} />
        <FieldValuePairs text='Street' value={address.street} />
        <FieldValuePairs text='City' value={address.city} />
        <FieldValuePairs text='Zipcode' value={address.zipcode} />
      </address>
    </div>
    <GoogleMap geo={address.geo} />
  </div>
);

const FieldValuePairs: React.FC<{
  text: string;
  value: string;
  type?: string;
  filterTerm?: string;
  filterBy?: FILTER_FIELD;
}> = ({ text, value, type, filterTerm, filterBy }) => (
  <div className={style['field-wrapper']}>
    <span className={style['field-name']}>{text}:</span>
    <span className={style['field-value']}>
      {type === 'phone' ? (
        <strong>{value}</strong>
      ) : type === 'website' ? (
        <a href={`http://${value}`} target='new'>
          http://{value}
        </a>
      ) : type === 'email' ? (
        <EmailAnchor
          value={value}
          filterTerm={filterTerm}
          filterBy={filterBy}
        />
      ) : type === 'text' && filterBy === FILTER_FIELD.COMPANY ? (
        <CompanyName
          value={value}
          filterTerm={filterTerm}
          filterBy={filterBy}
        />
      ) : (
        value
      )}
    </span>
  </div>
);

const EmailAnchor: React.FC<{
  value: string;
  filterTerm?: string;
  filterBy?: FILTER_FIELD;
}> = ({ value, filterTerm, filterBy }) => {
  if (filterTerm && filterBy && filterBy === FILTER_FIELD.EMAIL) {
    return (
      <a
        className={style['highlighted']}
        dangerouslySetInnerHTML={{
          __html: value.replace(filterTerm, `<span>${filterTerm}</span>`),
        }}
        href={`mailto:${value}`}
      ></a>
    );
  }
  return <a href={`mailto:${value}`}>{value}</a>;
};

const CompanyName: React.FC<{
  value: string;
  filterTerm?: string;
  filterBy?: FILTER_FIELD;
}> = ({ value, filterTerm, filterBy }) => {
  if (filterTerm && filterBy && filterBy === FILTER_FIELD.COMPANY) {
    return (
      <span
        className={style['highlighted']}
        dangerouslySetInnerHTML={{
          __html: value.replace(filterTerm, `<span>${filterTerm}</span>`),
        }}
      ></span>
    );
  }
  return <span>{value}</span>;
};

const GoogleMap: React.FC<{ geo: GeoLocation }> = ({ geo }) => {
  const { lat, lng } = geo;
  const src = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_KEY}&center=${lat},${lng}&maptype=satellite`;
  return (
    <iframe
      width='150'
      height='150'
      frameBorder='0'
      tabIndex={-1}
      title='user address'
      src={src}
      allowFullScreen
    ></iframe>
  );
};
