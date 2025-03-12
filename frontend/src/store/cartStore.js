import { create } from "zustand";
const initial = {
  cartProducts: [],
  cartListName: "",
  isCartToBeSubmit: false,
};
const useCartStore = create((set) => ({
  ...initial,
  addCartListName: (name) =>
    set(() => ({
      cartListName: name,
    })),
  setIsCartToBeSubmit: (payload) =>
    set(() => ({
      isCartToBeSubmit: payload,
    })),
  addToCart: (product) =>
    set((state) => {
      const updatedCartProducts = [...state.cartProducts];
      const categoryExist = updatedCartProducts.find(
        (item) => item.categoryName === product.category
      );
      if (categoryExist) {
        const targetIndex = categoryExist.products.findIndex(
          (item) => item._id === product._id
        );
        if (targetIndex !== -1) {
          const updatedProdcut = {
            ...categoryExist.products[targetIndex],
            quantity: categoryExist.products[targetIndex].quantity + 1,
          };
          categoryExist.products[targetIndex] = updatedProdcut;
        } else {
          const updatedProduct = {
            ...product,
            quantity: 1,
          };
          categoryExist.products.push(updatedProduct);
        }
      } else {
        updatedCartProducts.push({
          categoryName: product.category,
          products: [{ ...product, quantity: 1 }],
        });
      }

      return {
        cartProducts: updatedCartProducts,
      };
    }),
  removeFromCart: (product) =>
    set((state) => {
      const updatedCartProducts = [...state.cartProducts];
      const targetCategoryIndex = updatedCartProducts.findIndex(
        (item) => item.categoryName === product.category
      );
      const targetProductIndex = updatedCartProducts[
        targetCategoryIndex
      ].products.findIndex((item) => item._id === product._id);
      if (
        updatedCartProducts[targetCategoryIndex].products[targetProductIndex]
          .quantity === 1
      ) {
        updatedCartProducts[targetCategoryIndex].products = updatedCartProducts[
          targetCategoryIndex
        ].products.filter((item) => item._id !== product._id);

        if (updatedCartProducts[targetCategoryIndex].products.length === 0) {
          updatedCartProducts.splice(targetCategoryIndex, 1);
        }
      } else {
        const oldProduct =
          updatedCartProducts[targetCategoryIndex].products[targetProductIndex];
        updatedCartProducts[targetCategoryIndex].products[targetProductIndex] =
          {
            ...oldProduct,
            quantity: oldProduct.quantity - 1,
          };
      }

      return {
        cartProducts: updatedCartProducts,
      };
    }),
  clearProductFromCart: (product) =>
    set((state) => {
      const updatedCartProducts = [...state.cartProducts];
      const targetCategoryIndex = updatedCartProducts.findIndex(
        (item) => item.categoryName === product.category
      );
      updatedCartProducts[targetCategoryIndex].products = updatedCartProducts[
        targetCategoryIndex
      ].products.filter((item) => item._id !== product._id);

      if (updatedCartProducts[targetCategoryIndex].products.length === 0) {
        updatedCartProducts.splice(targetCategoryIndex, 1);
      }
      return {
        cartProducts: updatedCartProducts,
      };
    }),

  resetCart: () => set(initial),
}));

export default useCartStore;
