import useCartStore from "../../../store/cartStore";

/* eslint-disable react/prop-types */
export function CartNameForm({
  handleProceedToSubmit,
  cartProducts,
  cartName,
  setCartName,
  // updatedCartName,
  // setUpdatedCartName,
  isEdit,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleProceedToSubmit();
  };
  const cartListName = useCartStore((state) => state.cartListName);
  const addCartListName = useCartStore((state) => state.addCartListName);
  return (
    <>
      <form onSubmit={onSubmit}>
        <div
          className={`${
            cartProducts.length === 0
              ? "border-gray-200"
              : "border-clrOrangePeel"
          } mx-5 flex overflow-hidden rounded-xl border-2 bg-white`}>
          <input
            value={isEdit ? cartListName : cartName}
            disabled={cartProducts.length === 0}
            maxLength={40}
            onChange={(e) => {
              if (isEdit) {
                addCartListName(e.target.value);
                setCartName(e.target.value);
              } else {
                setCartName(e.target.value);
              }
            }}
            className={`${
              cartProducts.length === 0 ? "cursor-not-allowed" : ""
            } w-full border-0 py-3 pl-5 pr-3 text-lg outline-none`}
            type="text"
            placeholder="Enter a name"
          />
          <button
            disabled={cartProducts.length === 0}
            className={`
               ${
                 cartProducts.length === 0
                   ? "cursor-not-allowed  bg-gray-300"
                   : "  bg-clrOrangePeel "
               } roudnded-l-xl w-32 text-white`}>
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
