/* eslint-disable react/prop-types */
export default function HistoryProductCard({ product }) {
  return (
    <div
      key={product._id}
      className="flex w-fit max-w-[14rem] items-center gap-3 rounded-xl bg-white px-3  py-4  font-semibold shadow-custom  ">
      <p className="text-xs ">{product.name} </p>
      <p className="min-w-[30px] text-[10px] font-bold text-clrOrangePeel">
        {product.quantity} pcs
      </p>
    </div>
  );
}
