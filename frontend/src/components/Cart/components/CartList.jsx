import { faArrowLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUIStore from "../../../store/uiStore";
import { CartItem } from "./CartItem";
import { CartItemEdit } from "./CartItemEdit";
import useCartStore from "../../../store/cartStore";
export function CartList() {
  const cartProducts = useCartStore((state) => state.cartProducts);

  const isShowCartListEdit = useUIStore(
    (state) => state.cartView.isShowCartListEdit
  );
  // const showCartListEdit = useUIStore(state => state.showCartListEdit);
  const toggleCartListEdit = useUIStore((state) => state.toggleCartListEdit);
  const setIsCartToBeSubmit = useCartStore(
    (state) => state.setIsCartToBeSubmit
  );
  const cartListName = useCartStore((state) => state.cartListName);
  const toggleCartEdit = () => {
    toggleCartListEdit();
    setIsCartToBeSubmit(false);
  };
  return (
    <div>
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <div>
          {/* -- CartList Title -- */}
          <div className="flex items-center justify-between pb-3 pr-5">
            <h2 className="select-none text-2xl font-semibold">
              {cartListName || "Shopping List"}
            </h2>

            {isShowCartListEdit ? (
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="cursor-pointer select-none"
                onClick={toggleCartEdit}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPen}
                className="cursor-pointer select-none"
                onClick={toggleCartEdit}
              />
            )}
          </div>

          {/* -- CartList Items (CartItem | CartItemEdit) -- */}
          {!isShowCartListEdit
            ? cartProducts.map((item) => (
                <div key={item.categoryName}>
                  <p className="font-semibold">{item.categoryName}</p>
                  {item.products.map((product) => (
                    <CartItem key={product._id} product={product} />
                  ))}
                </div>
              ))
            : cartProducts.map((item) => (
                <div key={item.categoryName}>
                  <p className="font-semibold">{item.categoryName}</p>
                  {item.products.map((product) => (
                    <CartItemEdit key={product._id} product={product} />
                  ))}
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

function EmptyCart() {
  return (
    <>
      <div className="flex h-60 items-center justify-center">
        <h1 className="text-center text-xl font-semibold">No items</h1>
        <img
          className="absolute bottom-2 left-1/2  z-10 flex h-48 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
          src="./cart.svg"
          alt=""
        />
      </div>
    </>
  );
}
