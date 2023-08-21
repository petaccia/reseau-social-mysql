import React from 'react';
import Styles from './SearchInput.module.scss';
import { FcSearch } from 'react-icons/fc';

const SearchInput = ({ onChange, placeholder, value, filter }) => {
  return (
    <div className={Styles.searchInputContainer}>
    <div className={Styles.searchContainer}>
    <FcSearch alt="icon de recherche" className={Styles.searchIcon} />
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Rechercher"}
      className={Styles.searchInput}
      filter={filter}
    />
  </div>
    </div>

  )
}

export default SearchInput