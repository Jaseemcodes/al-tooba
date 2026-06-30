import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product, variantName = null) => {
    const items = get().items;
    // Find item with same product id AND same variant
    const existingIndex = items.findIndex(
      item => item.product.id === product.id && item.selectedVariant === variantName
    );

    let price = product.price;
    if (variantName && product.variants) {
      const variant = product.variants.find(v => v.name === variantName);
      if (variant) price = variant.price;
    }

    if (existingIndex > -1) {
      const newItems = [...items];
      newItems[existingIndex].quantity += 1;
      set({ items: newItems });
    } else {
      set({
        items: [...items, { product, selectedVariant: variantName, price, quantity: 1 }]
      });
    }
  },

  removeItem: (productId, variantName = null) => {
    const items = get().items;
    const newItems = items.filter(
      item => !(item.product.id === productId && item.selectedVariant === variantName)
    );
    set({ items: newItems });
  },

  updateQty: (productId, quantity, variantName = null) => {
    const items = get().items;
    const existingIndex = items.findIndex(
      item => item.product.id === productId && item.selectedVariant === variantName
    );

    if (existingIndex > -1) {
      const newItems = [...items];
      if (quantity <= 0) {
        newItems.splice(existingIndex, 1);
      } else {
        newItems[existingIndex].quantity = quantity;
      }
      set({ items: newItems });
    }
  },

  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  get count() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));
