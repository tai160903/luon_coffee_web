import { createSlice } from "@reduxjs/toolkit";

// Helper function to save cart to localStorage
const saveCartToStorage = (cartItems) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }
};

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }
  return [];
};

// Initial state
const initialState = {
  id: null,
  customerId: null,
  totalAmount: 0,
  totalQuantity: 0,
  cartItems: [],
  discount: null,
  finalTotal: 0,
};

// Calculate totals from cart items
const calculateCartTotals = (items) => {
  return items.reduce(
    (totals, item) => {
      const itemTotal =
        item.unitPrice * item.quantity +
        (item.customize.extra || 0) +
        (item.customize.customizeToppings?.reduce(
          (sum, topping) => sum + topping.price * topping.quantity,
          0
        ) || 0);

      totals.quantity += item.quantity;
      totals.amount += itemTotal;
      return totals;
    },
    { quantity: 0, amount: 0 }
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const {
        id,
        quantity = 1,
        unitPrice,
        imageProduct,
        description,
        customize,
      } = action.payload;

      // Create a unique key based on product ID and customization
      const customizeKey = JSON.stringify({
        size: customize.size,
        note: customize.note,
        toppings:
          customize.customizeToppings
            ?.map((t) => `${t.topping}:${t.quantity}`)
            .join("|") || "",
      });

      const itemKey = `${id}-${customizeKey}`;

      // Check if item exists with the same customization
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          `${item.id}-${JSON.stringify({
            size: item.customize.size,
            note: item.customize.note,
            toppings:
              item.customize.customizeToppings
                ?.map((t) => `${t.topping}:${t.quantity}`)
                .join("|") || "",
          })}` === itemKey
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.cartItems.push({
          id,
          quantity,
          unitPrice,
          imageProduct,
          description,
          customize: {
            ...customize,
            id: customize.id || `customize-${Date.now()}`, // Generate ID if not provided
          },
        });
      }

      // Calculate totals
      const totals = calculateCartTotals(state.cartItems);
      state.totalQuantity = totals.quantity;
      state.totalAmount = totals.amount;
      state.finalTotal = state.totalAmount - (state.discount?.value || 0);

      // Save to localStorage
      saveCartToStorage(state.cartItems);
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);

      // Calculate totals
      const totals = calculateCartTotals(state.cartItems);
      state.totalQuantity = totals.quantity;
      state.totalAmount = totals.amount;
      state.finalTotal = state.totalAmount - (state.discount?.value || 0);

      // Save to localStorage
      saveCartToStorage(state.cartItems);
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { itemId, customizeId, quantity } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === itemId && item.customize.id === customizeId
      );

      if (itemIndex >= 0) {
        // Don't allow quantities less than 1
        state.cartItems[itemIndex].quantity = Math.max(1, quantity);

        // Calculate totals
        const totals = calculateCartTotals(state.cartItems);
        state.totalQuantity = totals.quantity;
        state.totalAmount = totals.amount;
        state.finalTotal = state.totalAmount - (state.discount?.value || 0);

        // Save to localStorage
        saveCartToStorage(state.cartItems);
      }
    },

    // Update item customization
    updateCustomization: (state, action) => {
      const { itemId, customizeId, updatedCustomize } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === itemId && item.customize.id === customizeId
      );

      if (itemIndex >= 0) {
        // Update the customization
        state.cartItems[itemIndex].customize = {
          ...state.cartItems[itemIndex].customize,
          ...updatedCustomize,
        };

        // Calculate totals
        const totals = calculateCartTotals(state.cartItems);
        state.totalQuantity = totals.quantity;
        state.totalAmount = totals.amount;
        state.finalTotal = state.totalAmount - (state.discount?.value || 0);

        // Save to localStorage
        saveCartToStorage(state.cartItems);
      }
    },

    // Update topping
    updateTopping: (state, action) => {
      const { itemId, customizeId, toppingId, quantity } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === itemId && item.customize.id === customizeId
      );

      if (itemIndex >= 0) {
        // Find the topping
        const toppingIndex = state.cartItems[
          itemIndex
        ].customize.customizeToppings.findIndex((t) => t.topping === toppingId);

        if (toppingIndex >= 0) {
          // Update existing topping
          state.cartItems[itemIndex].customize.customizeToppings[
            toppingIndex
          ].quantity = quantity;
        } else if (quantity > 0) {
          // Add new topping
          state.cartItems[itemIndex].customize.customizeToppings.push({
            topping: toppingId,
            quantity,
            price: action.payload.price || 0,
          });
        }

        // Calculate totals
        const totals = calculateCartTotals(state.cartItems);
        state.totalQuantity = totals.quantity;
        state.totalAmount = totals.amount;
        state.finalTotal = state.totalAmount - (state.discount?.value || 0);

        // Save to localStorage
        saveCartToStorage(state.cartItems);
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.finalTotal = 0;
      state.discount = null;

      // Save to localStorage
      saveCartToStorage([]);
    },

    // Apply discount to cart (for promotional codes)
    applyDiscount: (state, action) => {
      const { discountAmount, discountType } = action.payload;

      if (discountType === "percentage") {
        // Apply percentage discount
        const discountValue = (state.totalAmount * discountAmount) / 100;
        state.discount = {
          type: discountType,
          amount: discountAmount,
          value: discountValue,
        };
      } else if (discountType === "fixed") {
        // Apply fixed amount discount
        state.discount = {
          type: discountType,
          amount: discountAmount,
          value: discountAmount,
        };
      }

      // Calculate final total
      state.finalTotal = Math.max(
        0,
        state.totalAmount - (state.discount?.value || 0)
      );
    },

    // Remove discount from cart
    removeDiscount: (state) => {
      state.discount = null;
      state.finalTotal = state.totalAmount;
    },

    // Initialize cart from localStorage or reset it
    initializeCart: (state) => {
      const items = loadCartFromStorage();
      state.cartItems = items;

      // Calculate totals
      const totals = calculateCartTotals(items);
      state.totalQuantity = totals.quantity;
      state.totalAmount = totals.amount;
      state.finalTotal = state.totalAmount - (state.discount?.value || 0);
    },

    // Set cart info from API or backend (overwrite all cart data)
    setCartInfo: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload.cartItems)) {
        state.cartItems = payload.cartItems;
        if (payload.id) state.id = payload.id;
        if (payload.customerId) state.customerId = payload.customerId;
        if (payload.totalAmount) state.totalAmount = payload.totalAmount;
        if (payload.totalQuantity) state.totalQuantity = payload.totalQuantity;
        if (payload.discount) state.discount = payload.discount;
        if (payload.finalTotal) state.finalTotal = payload.finalTotal;
      } else {
        // fallback: empty cart
        state.cartItems = [];
        state.id = null;
        state.customerId = null;
        state.totalAmount = 0;
        state.totalQuantity = 0;
        state.discount = null;
        state.finalTotal = 0;
      }

      // Save to localStorage
      saveCartToStorage(state.cartItems);
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateCustomization,
  updateTopping,
  applyDiscount,
  removeDiscount,
  initializeCart,
  setCartInfo,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
