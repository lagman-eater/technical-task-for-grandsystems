import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './features/products/productsSlice';
import productsData from './data/products.json'
import styles from './styles/App.module.css';
import ProductsList from './features/products/ProductsList';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, [dispatch]);

  return (
    <div>
      <Filters />
      <SearchBar />
      <h1 className={styles.title}>Product List</h1>
      <ProductsList />
    </div>
  );
}

export default App;
