import { SearchInput } from "./components/SearchInput";
import { useGetProducts } from "../../lib/react-query/queries";
import ProductList from "./components/ProductList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
export default function Main() {
  const {
    data,
    isPending: isProductsLoading,
    isError: isProductsError,
  } = useGetProducts();

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  if (isProductsError) {
    return (
      <>
        <div className="size-full px-2">
          <h3 className="py-10 text-center text-3xl">
            Something went wrong :(
          </h3>
          <button
            onClick={() => {
              navigate(0);
            }}
            className="mx-auto block rounded-md bg-clrOrangePeel p-2 text-sm text-white">
            Refresh Page
          </button>
        </div>
      </>
    );
  }

  return (
    <section className="px-2">
      {/* ----HEADER----- */}
      <header className="px-10 py-5">
        <div className="flex flex-wrap items-center justify-center gap-4 xl:justify-between">
          <div className="">
            <h1 className="text-2xl font-medium leading-tight max-sm:text-center  sm:text-3xl ">
              <span className="font-semibold text-clrOrangePeel ">
                Shoppingify
              </span>
              allows you take your <br /> shopping list wherever you go
            </h1>
          </div>

          <div className="">
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/*-----MAIN---- */}
      <div className="flex-1">
        <div className="px-10 max-sm:px-4">
          {isProductsLoading ? (
            <div className="grid min-h-[400px] place-content-center">
              <LoaderCircle className="mx-auto animate-spin text-clrOrangePeel" />
            </div>
          ) : (
            <ProductList
              searchText={searchText}
              products={data?.data?.payload?.products}
            />
          )}
        </div>
      </div>
    </section>
  );
}
