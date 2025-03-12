import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUIStore from "../../../store/uiStore";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "../../../store/cartStore";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useDeleteProduct } from "../../../lib/react-query/queries";
// import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
export function ProductPreview() {
  const { user } = useAuth();
  const { mutateAsync: deleteProduct, isPending: isLoadingDelete } =
    useDeleteProduct();
  const product = useUIStore((state) => state.productPreview);
  const showCartList = useUIStore((state) => state.showCartList);
  const addToCart = useCartStore((state) => state.addToCart);
  // const [imageLoaded, setImageLoaded] = useState(false);

  const onBack = () => showCartList();
  const handleAddToCart = () => {
    addToCart(product);
    showCartList();
  };
  const handleDeleteProduct = async () => {
    try {
      const { data } = await deleteProduct(product._id);
      toast.success(data?.message);
      showCartList();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const DEFAULT_IMAGE = "./defaultImage.avif";
  return (
    <div className="mx-3 flex h-full flex-col  overflow-hidden">
      <div onClick={onBack} className=" flex cursor-pointer items-center gap-2">
        <FontAwesomeIcon icon={faLeftLong} className="text-clrOrangePeel " />
        <p className="text-clrOrangePeel">Back</p>
      </div>
      <div className=" flex flex-1 flex-col gap-3 overflow-y-auto  pt-6">
        <div className="h-[190px] overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover"
            // src={imageLoaded ? product?.image : DEFAULT_IMAGE}
            src={product?.image ? product?.image : DEFAULT_IMAGE}
            alt="product image"
            // onLoad={() => {
            //   setImageLoaded(true);
            // }}
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-1 text-xs">Name</p>
          <p className="text-sm font-semibold">{product.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="mb-1 text-xs">Category</p>
          <p className="text-sm font-semibold">{product.category}</p>
        </div>
        <div className="flex flex-col">
          <p className="mb-1 text-xs">Description</p>
          <p className="customScollbarCartList h-48 overflow-y-scroll text-sm font-semibold">
            {product.description || "--"}
          </p>
          {/* <p className="customScollbarCartList h-64 overflow-y-auto   text-sm font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            magni voluptates accusantium ipsum quae necessitatibus aliquam nemo
            vel unde, blanditiis, corporis veniam quia eos, nesciunt illo
            debitis repellat harum incidunt placeat reprehenderit alias? Hic,
            dignissimos! Delectus culpa blanditiis tempore ullam sint,
            consequatur incidunt. Labore modi pariatur odio adipisci quisquam
            possimus. incidunt. Labore modi pariatur odio adipisci quisquam
            possimus.
          </p> */}
        </div>
        <div className="mb-5 mt-auto flex justify-center gap-5">
          {/* only show the delete if it is the creator */}
          {product.ownerId === user._id && (
            <button
              disabled={isLoadingDelete}
              onClick={handleDeleteProduct}
              className="w-28 rounded-2xl border-2 border-clrValentineRed py-3 font-semibold text-clrValentineRed duration-300 hover:bg-clrValentineRed hover:text-white disabled:cursor-not-allowed disabled:bg-clrValentineRed disabled:text-white disabled:opacity-60">
              {isLoadingDelete ? (
                <LoaderCircle className="mx-auto animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          )}
          <button
            disabled={isLoadingDelete}
            onClick={handleAddToCart}
            className="w-28  rounded-2xl border-2 bg-clrOrangePeel py-3 text-white disabled:cursor-not-allowed disabled:opacity-60">
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
}
