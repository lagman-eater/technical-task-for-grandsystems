import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './productsSlice';
import { RootState } from '../../app/store';
import ProductItem from './ProductItem';
import productData from '../../data/products.json'

const ProductsList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.filteredItems);

  useEffect(() => {
      dispatch(setProducts(productData))
  }, [dispatch]);

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
