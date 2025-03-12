/* eslint-disable react/prop-types */

import HistoryProductCard from "./HistoryProductCard";

/* eslint-disable no-unused-vars */
export default function HistoryProductList({ products }) {
  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-3 max-sm:justify-start ">
        {products.map((product) => (
          <HistoryProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
