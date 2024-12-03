import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage } from '../../utilities/localStorage'

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
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
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

      saveToLocalStorage('favorites', state.favorites);

      state.filteredItems = state.items.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());

        if (state.selectedCategory === 'favorites') {
          return matchesSearch && state.favorites.includes(product.id);
        }

        const matchesCategory =
          !state.selectedCategory || product.category === state.selectedCategory;

        return matchesSearch && matchesCategory;
      });
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      state.favorites = action.payload;
    },
    filterProducts(state) {
      state.filteredItems = state.items.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());

        if (state.selectedCategory === 'favorites') {
          return matchesSearch && state.favorites.includes(product.id);
        }

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
