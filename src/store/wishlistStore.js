import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  items: [],
  
  toggleItem: (product) => {
    const items = get().items;
    const isExist = items.some(item => item.id === product.id);
    if (isExist) {
      set({ items: items.filter(item => item.id !== product.id) });
    } else {
      set({ items: [...items, product] });
    }
  },

  isWishlisted: (productId) => {
    return get().items.some(item => item.id === productId);
  }
}));
