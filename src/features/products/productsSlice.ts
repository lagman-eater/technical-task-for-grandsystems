import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage } from '../../utilities/localStorage'  // Импортируем функцию сохранения в localStorage

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  favorites: number[];
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),  // Загружаем избранные из localStorage
  searchQuery: '',
  selectedCategory: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
      
      // Сохраняем список избранных в localStorage
      saveToLocalStorage('favorites', state.favorites);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    filterProducts(state) {
      state.filteredItems = state.items.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        const matchesCategory =
          !state.selectedCategory || product.category === state.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    },
  },
});

export const {
  setProducts,
  toggleFavorite,
  setSearchQuery,
  setSelectedCategory,
  filterProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
