/* eslint-disable react/prop-types */

import { LoaderCircle } from "lucide-react";

export default function TopCategoryList({
  topCategoryList,
  totalQuantity,
  isError,
  isLoading,
}) {
  const convertTo100Percent = (value) =>
    Math.floor((value / totalQuantity) * 100) + "%";

  if (isError) {
    return (
      <>
        <h2 className="mb-4 text-xl font-semibold">Top Categories</h2>
        <div className="grid h-[100px] place-content-center space-y-7">
          <p>Something went wrong</p>
        </div>
      </>
    );
  }
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Top Categories</h2>
      <div className="space-y-7">
        {isLoading && (
          <>
            <div className="grid h-[100px] place-content-center">
              <LoaderCircle className="animate-spin text-clrOrangePeel" />
            </div>
          </>
        )}
        {!isLoading && !topCategoryList && (
          <div className="grid h-[100px] place-content-center">
            <p>No Top Categories yet</p>
          </div>
        )}
        {!isLoading && topCategoryList?.length == 0 && (
          <div className="grid h-[100px] place-content-center">
            <p>No Items in Cart</p>
          </div>
        )}
        {!isLoading &&
          topCategoryList?.length > 0 &&
          topCategoryList?.map((item) => {
            const percentage = convertTo100Percent(item.total_products);

            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <p>{item.category}</p>
                  <p>{percentage}</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-xl bg-clrPearlBush">
                  <div
                    style={{ width: `${percentage}` }}
                    className={`h-full  bg-clrMalibu `}></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
