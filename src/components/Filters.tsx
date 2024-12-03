import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setSelectedCategory, filterProducts } from '../features/products/productsSlice';
import styles from '../styles/Components.module.css'

const Filters: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedCategory, items } = useSelector((state: RootState) => state.products);

    const categories = Array.from(new Set(items.map((product) => product.category)));

    const handleCategoryChange = (category: string | null) => {
        dispatch(setSelectedCategory(category));
        dispatch(filterProducts());
    };

    const handleFavoritesToggle = () => {
        if (selectedCategory === 'favorites') {
            handleCategoryChange(null);
        } else {
            handleCategoryChange('favorites');
        }
    };

    return (
        <div className={styles.filters}>
            <h3>Фильтры</h3>

            <div className={styles.categoryFilters}>
                <select
                    value={selectedCategory || ''}
                    onChange={(e) =>
                        handleCategoryChange(e.target.value || null)
                    }
                >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.favoritesFilter}>
                <button
                    onClick={handleFavoritesToggle}
                    className={selectedCategory === 'favorites' ? styles.active : ''}
                >
                    Избранное
                </button>
            </div>
        </div>
    );
};

export default Filters;
