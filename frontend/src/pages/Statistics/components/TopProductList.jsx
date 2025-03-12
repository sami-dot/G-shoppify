import { LoaderCircle } from "lucide-react";

/* eslint-disable react/prop-types */
export default function TopItemList({
  topProductList,
  totalQuantity,
  isLoading,
  isError,
}) {
  const convertTo100Percent = (value) =>
    Math.floor((value / totalQuantity) * 100) + "%";

  if (isError) {
    return (
      <div>
        <h2 className="mb-4 text-xl font-semibold">Top items</h2>
        <div className="space-y-7">
          <p>Something went wrong. Refresh The page</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Top items</h2>
      <div className="space-y-7">
        {isLoading && (
          <div className="grid h-[100px] place-content-center">
            <LoaderCircle className="animate-spin text-clrOrangePeel" />
          </div>
        )}
        {!isLoading && !topProductList && (
          <div className="grid h-[100px] place-content-center">
            <p>No Top Items yet </p>
          </div>
        )}
        {!isLoading && topProductList?.length == 0 && (
          <div className="grid h-[100px] place-content-center">
            <p>No </p>
          </div>
        )}

        {!isLoading &&
          topProductList?.length > 0 &&
          topProductList?.map((item) => {
            const percentage = convertTo100Percent(item.quantity);
            return (
              <div key={item.product._id} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <p>{item.product.name}</p>
                  <p>{percentage}</p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-xl bg-clrPearlBush">
                  <div
                    style={{ width: `${percentage}` }}
                    className={`h-full bg-clrOrangePeel `}></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
