import instance from "../utils/instance";
import store from "../redux/store";
import { clearCart } from "../redux/cartSilce";

const cartService = {
  addToCart: async (data) => {
    try {
      const response = await instance.post("/Cart/add-customize-to-cart", data);
      return response.data;
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
      console.log("Cart cleared successfully:", response.data);

      // Clear Redux cart as well
      store.dispatch(clearCart());

      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      return null;
    }
  },

  deleteCartItem: async (cartItemId) => {
    try {
      const response = await instance.put(`/Cart/delete-cart-item`, {
        cartItemId,
      });
      console.log("Cart item deleted successfully:", response.data);

      // Note: Redux cart will need to be updated separately
      // This is usually done in the component that calls this method

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

      console.log("Local cart synced with server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error syncing local cart with server:", error.message);
      return null;
    }
  },

  // Update cart item quantity
  updateCartItemQuantity: async (cartItemId, newQuantity) => {
    try {
      const response = await instance.put(`/Cart/update-quantity`, {
        cartItemId,
        quantity: newQuantity,
      });

      console.log("Cart item quantity updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating cart item quantity:", error.message);
      return null;
    }
  },
};

export default cartService;
