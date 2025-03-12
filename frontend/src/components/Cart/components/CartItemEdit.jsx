/* eslint-disable react/prop-types */
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function CartItemEdit({ product }) {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="mx-3 my-2 flex items-center justify-between py-2">
        <div
          onClick={() => setChecked(!checked)}
          className={twMerge(
            checked ? "before:text-clrOrangePeel before:content-['✔']" : "",
            "flex items-center gap-2 py-2",
            "before:grid before:h-5 before:w-5 before:place-items-center before:border-2 before:border-clrOrangePeel before:bg-transparent before:text-xs"
          )}>
          {/* <input id='check' type="checkbox" className='border-2 rounded bg-transparent accent-clrOrangePeel w-0 opacity-0'  checked={checked} /> */}
          <p
            className={twMerge(
              checked ? "line-through  " : "",
              "max-w-[100px]  cursor-pointer select-none overflow-hidden text-ellipsis text-base "
            )}>
            {product?.name}
            {/* Orange */}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className=" w-0  rounded-xl py-2">
            <FontAwesomeIcon icon={faTrash} className="text-transparent" />
          </div>

          <p className=" rounded-2xl border-2  border-clrOrangePeel bg-transparent  px-2 py-1 text-sm ">
            {product?.quantity} pcs
            {/* 3 pcs */}
          </p>
        </div>
      </div>
    </>
  );
}
