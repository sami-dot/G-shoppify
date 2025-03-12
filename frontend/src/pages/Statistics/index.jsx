import SummaryChart from "./components/SummaryChart";
import TopCategoryList from "./components/TopCategoryList";
import TopProductList from "./components/TopProductList";
import {
  useGetTopCategory,
  useGetTopProducts,
} from "../../lib/react-query/queries";

export default function Statistics() {
  const {
    data: topCategoryData,
    isPending: isTopCategoryLoading,
    isError: isTopCategoryError,
  } = useGetTopCategory();

  const {
    data: topProductData,
    isError: isTopProductsError,
    isPending: isTopProductsLoading,
  } = useGetTopProducts();

  const totalQuantity =
    topProductData?.data?.payload?.topProducts?.total_quantity;
  const topProductList = topProductData?.data?.payload?.topProducts?.products;
  const topCategoryList =
    topCategoryData?.data?.payload?.topCategories?.categories;

  return (
    <section className="flex flex-col gap-10 space-y-4 px-10 py-8 max-sm:px-4 ">
      <div className="flex min-h-[205px] gap-8 max-md:flex-col">
        <div className="flex-1">
          <TopProductList
            topProductList={topProductList}
            totalQuantity={totalQuantity}
            isError={isTopProductsError}
            isLoading={isTopProductsLoading}
          />
        </div>
        <div className="flex-1">
          <TopCategoryList
            topCategoryList={topCategoryList}
            totalQuantity={totalQuantity}
            isError={isTopCategoryError}
            isLoading={isTopCategoryLoading}
          />
        </div>
      </div>
      <div className="">
        <SummaryChart />
      </div>
    </section>
  );
}
