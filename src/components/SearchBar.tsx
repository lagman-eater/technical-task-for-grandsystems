import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, filterProducts } from '../features/products/productsSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.products.searchQuery); 

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query)); 
    dispatch(filterProducts()); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
