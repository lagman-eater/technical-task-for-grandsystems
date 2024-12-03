import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, filterProducts } from '../features/products/productsSlice';
import styles from '../styles/Components.module.css';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.products.searchQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    if (debouncedQuery !== searchQuery) {
      dispatch(filterProducts());
    }
  }, [debouncedQuery, dispatch, searchQuery]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery && (
        <button onClick={() => dispatch(setSearchQuery(''))} className={styles.clearButton}>
          Очистить
        </button>
      )}
    </div>
  );
};

export default SearchBar;
