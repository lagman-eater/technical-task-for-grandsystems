import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setSelectedCategory, filterProducts } from '../features/products/productsSlice';

const Filters: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedCategory, items } = useSelector((state: RootState) => state.products);

    const categories = Array.from(new Set(items.map((product) => product.category)));

    const handleCategoryChange = (category: string | null) => {
        dispatch(setSelectedCategory(category));
        dispatch(filterProducts());
    };

    const handleFavoritesToggle = () => {
        dispatch(setSelectedCategory('favorites'));
        dispatch(filterProducts());
    };

    return (
        <div className="filters">
            <h3>Фильтры</h3>
            <div className="category-filters">
                <button
                    onClick={() => handleCategoryChange(null)}
                    className={selectedCategory === null ? 'active' : ''}
                >
                    Все категории
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={selectedCategory === category ? 'active' : ''}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="favorites-filter">
                <button
                    onClick={handleFavoritesToggle}
                    className={selectedCategory === 'favorites' ? 'active' : ''}
                >
                    Избранное
                </button>
            </div>
        </div>
    );
};

export default Filters;
