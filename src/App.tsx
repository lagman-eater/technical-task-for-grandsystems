import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './features/products/productsSlice';
import productsData from './data/products.json';
import styles from './styles/App.module.css';
import ProductsList from './features/products/ProductsList';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('productsLoaded')) {
      dispatch(setProducts(productsData));
      localStorage.setItem('productsLoaded', 'true');
    }
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.filtersContainer}>
        <Filters />
        <SearchBar />
      </div>
      <h1 className={styles.title}>Список продуктов</h1>
      <ProductsList />
    </div>
  );
}

export default App;
