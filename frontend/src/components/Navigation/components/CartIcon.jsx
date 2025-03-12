import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUIStore from "../../../store/uiStore";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "../../../store/cartStore";

export default function CartIcon() {
  const toggleCart = useUIStore((state) => state.toggleCart);
  const cartProducts = useCartStore((state) => state.cartProducts);
  // calculate the total products in cart
  const totalCartProducts = cartProducts.reduce((acc, curr) => {
    return acc + curr.products.reduce((ac, cur) => cur.quantity + ac, 0);
  }, 0);

  return (
    <div
      onClick={toggleCart}
      className=" relative mx-auto w-[65%] cursor-pointer rounded-full bg-clrOrangePeel py-2 text-center">
      <p className=" absolute -top-1 right-0 grid  h-1/2 w-1/2 place-content-center rounded-full bg-clrValentineRed text-xs font-semibold text-white">
        {totalCartProducts}
      </p>
      <FontAwesomeIcon icon={faCartShopping} color="white" />
    </div>
  );
}
