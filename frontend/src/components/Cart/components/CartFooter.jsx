/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import useUIStore from "../../../store/uiStore";
import useCartStore from "../../../store/cartStore";
import { formatCartItems } from "../../../utils";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateCart } from "../../../lib/react-query/queries";
import { twMerge } from "tailwind-merge";
import { CART_STATUS } from "../../../utils/constants";
import Modal from "../../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CartNameForm } from "./CartNameForm";

export function CartFooter() {
  const showCartList = useUIStore((state) => state.showCartList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isShowCartListEdit = useUIStore(
    (state) => state.cartView.isShowCartListEdit
  );

  const {
    cartProducts,
    isCartToBeSubmit,
    setIsCartToBeSubmit,
    addCartListName,
    resetCart,
    cartListName,
  } = useCartStore((state) => state);

  const { mutateAsync: createCart, isPending: isLoadingCreate } =
    useCreateCart();

  //  local state to track cartListName
  const [cartName, setCartName] = useState("");
  // local state to track cartListNameUpdate
  // const [updatedCartName, setUpdatedCartName] = useState("");

  useEffect(() => {
    if (cartProducts.length === 0) {
      setIsCartToBeSubmit(false);
      addCartListName("");
      setCartName("");
      // setUpdatedCartName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleProceedToSubmit = () => {
    addCartListName(cartName);

    if (cartName === "") {
      toast.error("Cart Name Required");
      return;
    }

    showCartList();
    setIsCartToBeSubmit(true);
  };

  const handleCancelSubmitCart = async () => {
    const formatedCartItems = formatCartItems(cartProducts);

    // prepare the payload
    const payload = {
      cartName: cartListName,
      status: CART_STATUS.CANCELLED,
      items: formatedCartItems,
    };

    try {
      const { data } = await createCart(payload);
      resetCart();
      showCartList();
      closeModal();
      setCartName("");
      // setUpdatedCartName("");
    } catch (error) {
      // console.log(error?.response?.data);

      toast.error(error?.response?.data?.message);
    }
  };

  const handleSubmitCart = async () => {
    const formatedCartItems = formatCartItems(cartProducts);

    // prepare the payload
    const payload = {
      cartName: cartListName,
      status: CART_STATUS.COMPLETED,
      items: formatedCartItems,
    };

    try {
      const { data } = await createCart(payload);
      toast.success(data?.message);
      resetCart();
      showCartList();
      setCartName("");
      // setUpdatedCartName("");
    } catch (error) {
      // console.log(error?.response?.data);
      if (error?.response?.data?.errors.length > 0) {
        let errors = error?.response?.data?.errors;
        errors.forEach((err) => {
          let val = Object.values(err);
          toast.error(val[0]);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="bg-white py-8">
        {!isCartToBeSubmit && (
          <div>
            <CartNameForm
              cartProducts={cartProducts}
              cartName={cartName}
              setCartName={setCartName}
              // updatedCartName={updatedCartName}
              // setUpdatedCartName={setUpdatedCartName}
              handleProceedToSubmit={handleProceedToSubmit}
              isEdit={isShowCartListEdit}
            />
          </div>
        )}

        {isCartToBeSubmit && cartProducts.length > 0 && (
          <div className="mt-auto flex justify-center gap-5">
            <button
              disabled={isLoadingCreate}
              onClick={openModal}
              className="w-24 rounded-2xl border-2 py-3 disabled:cursor-not-allowed disabled:opacity-60">
              Cancel
            </button>
            <button
              onClick={handleSubmitCart}
              disabled={isLoadingCreate}
              className={twMerge(
                "w-24 rounded-2xl border-2  bg-clrMalibu py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
              )}>
              {isLoadingCreate ? (
                <LoaderCircle className="mx-auto animate-spin" />
              ) : (
                <p>Complete</p>
              )}
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="z-30 grid h-[80vh] place-items-center font-Quicksand">
            <div
              className="rounded-xl  bg-white px-5 py-5 max-lg:min-w-[60%] lg:w-[500px]"
              onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <h1 className="mb-5 text-xl">
                  Are You Sure You want to <br /> cancel this list ?
                </h1>
                <FontAwesomeIcon
                  onClick={closeModal}
                  className="absolute -top-2 right-0  border-black p-2 text-xl text-clrGranite hover:cursor-pointer"
                  icon={faClose}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="w-20 rounded-2xl border-2 py-2 text-xs">
                  Cancel
                </button>
                <button
                  onClick={handleCancelSubmitCart}
                  className="w-20 rounded-2xl border-2 bg-clrValentineRed py-3 text-xs text-white">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
