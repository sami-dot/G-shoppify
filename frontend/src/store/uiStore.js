import { create } from "zustand";
const SHOW = {
  CART_LIST: "isShowCartList",
  CART_EDIT_LIST: "isShowCartListEdit",
  PRODUCT_PREVIEW: "isShowProductPreview",
  PRODUCT_ADD_FORM: "isShowProductAddForm",
};

const useUIStore = create((set) => ({
  isCartOpen: false,
  cartView: {
    isShowCartList: true,
    isShowProductPreview: false,
    isShowCartListEdit: false,
    isShowProductAddForm: false,
  },
  productPreview: null,
  showProductPreview: (product) =>
    set(() => ({
      cartView: {
        ...showFn(SHOW.PRODUCT_PREVIEW),
      },
      productPreview: product,
    })),

  showCartList: () =>
    set(() => ({
      cartView: {
        ...showFn(SHOW.CART_LIST),
      },
    })),
  showCartListEdit: () =>
    set(() => ({
      cartView: {
        ...showFn(SHOW.CART_EDIT_LIST),
      },
    })),
  showProductAddForm: () =>
    set(() => ({
      cartView: {
        ...showFn(SHOW.PRODUCT_ADD_FORM),
      },
    })),
  toggleCartListEdit: () =>
    set((state) => ({
      cartView: {
        isShowCartList: !state.cartView.isShowCartList,
        isShowProductPreview: false,
        isShowCartListEdit: !state.cartView.isShowCartListEdit,
        isShowProductAddForm: false,
      },
    })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set(() => ({ isCartOpen: false })),
  openCart: () => set(() => ({ isCartOpen: true })),
}));
export default useUIStore;

// helper function
const showFn = (type) => {
  let initial = {
    isShowCartList: true,
    isShowProductPreview: false,
    isShowCartListEdit: false,
    isShowProductAddForm: false,
  };

  switch (type) {
    case SHOW.CART_LIST:
      _magic(initial, SHOW.CART_LIST);
      return initial;
    case SHOW.CART_EDIT_LIST:
      _magic(initial, SHOW.CART_EDIT_LIST);

      return initial;
    case SHOW.PRODUCT_ADD_FORM:
      _magic(initial, SHOW.PRODUCT_ADD_FORM);

      return initial;
    case SHOW.PRODUCT_PREVIEW:
      _magic(initial, SHOW.PRODUCT_PREVIEW);

      return initial;
    default:
      return initial;
  }
};

function _magic(initial, type) {
  for (const key of Object.keys(initial)) {
    if (key === type) {
      initial[key] = true;
    } else {
      initial[key] = false;
    }
  }
}
