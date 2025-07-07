import instance from "../utils/instance";
import { store } from "../redux/store/store";
import { clearCart } from "../redux/slices/cartSlice";

const cartService = {
  addToCart: async (data) => {
    try {
      const response = await instance.post("/Cart/add-customize-to-cart", data);
      return response;
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      return null;
    }
  },

  getCart: async () => {
    try {
      const response = await instance.get("/Cart/get-cart-by-customer");

      return response.data;
    } catch (error) {
      console.error("Error retrieving cart:", error.message);
    }
  },

  clearCart: async () => {
    try {
      const response = await instance.delete("/Cart/clear-cart");
      store.dispatch(clearCart());
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      return null;
    }
  },

  deleteCartItem: async (cartItemId) => {
    try {
      const response = await instance.delete(`/Cart/remove-cart-item`, {
        data: { cartItemId },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting cart item:", error.message);
      return null;
    }
  },

  // New method to sync local cart with server
  syncLocalCartWithServer: async (localCartItems) => {
    try {
      const formattedItems = localCartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        customize: {
          sizeId: item.customize.size,
          note: item.customize.note,
          customizeToppings: item.customize.customizeToppings || [],
        },
      }));

      // You'll need to create an API endpoint for this
      const response = await instance.post("/Cart/sync-cart", {
        items: formattedItems,
      });

      return response.data;
    } catch (error) {
      console.error("Error syncing local cart with server:", error.message);
      return null;
    }
  },

  updateCartItemQuantity: async (cartItemId, newQuantity) => {
    try {
      const response = await instance.put(`/Cart/update-cart-item`, {
        cartItemId,
        newQuantity: newQuantity,
      });

      return response.data;
    } catch (error) {
      console.error("Error updating cart item quantity:", error.message);
      return null;
    }
  },
};

export default cartService;
