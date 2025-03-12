import useUIStore from "../../store/uiStore";
import {
  AddProductForm,
  CartFooter,
  CartHeader,
  CartList,
  ProductPreview,
} from "./components";

export default function Cart() {
  const { isShowProductPreview, isShowProductAddForm } = useUIStore(
    (state) => state.cartView
  );
  return (
    <>
      <div className="h-screen">
        {!isShowProductAddForm && !isShowProductPreview ? (
          <div className="relative flex h-screen  flex-col bg-clrYellowishOrange  pt-5">
            <div className="mx-3  mb-5">
              <CartHeader />
            </div>
            <div className="flex-1">
              <div className="customScollbarCartList  mx-3  max-h-[60vh]  overflow-y-auto">
                <CartList />
              </div>
            </div>
            <div className="mb-5x">
              <CartFooter />
            </div>
          </div>
        ) : (
          <div className="h-full bg-white pt-5">
            {isShowProductPreview && <ProductPreview />}
            {isShowProductAddForm && <AddProductForm />}
          </div>
        )}
      </div>
    </>
  );
}
