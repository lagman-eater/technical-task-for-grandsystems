import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from './productsSlice'
import { RootState } from '../../app/store';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => state.products.favorites.includes(product.id));

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(product.id)); 
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ProductItem;
