import {
  faAngleRight,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { CART_STATUS } from "../../../utils/constants";

/* eslint-disable react/prop-types */
export default function HistoryCard({ item }) {
  return (
    <div key={item._id} className="flex bg-white  px-2 py-3  shadow-custom ">
      <Link to={`/history/${item?._id || 2}`} className="w-32 font-semibold">
        {item.name}
      </Link>

      <div className="ml-auto flex items-center gap-4 text-xs text-clrSliverSand">
        <div className="flex items-center gap-2 font-semibold">
          <FontAwesomeIcon icon={faCalendarDays} />
          <p>
            {new Date(item?.createdAt).toLocaleString("en", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <p
          className={twMerge(
            `${
              item?.status === CART_STATUS.COMPLETED
                ? "border-clrMalibu  text-clrMalibu"
                : "border-clrValentineRed text-clrValentineRed"
            }`,
            " rounded-xl border   px-2 py-1 font-semibold"
          )}>
          {item?.status || "success"}
        </p>

        <Link
          to={`/history/${item?._id || 2}`}
          className="w-4 text-center font-semibold">
          <FontAwesomeIcon
            className={`${
              item?.status === CART_STATUS.COMPLETED
                ? "  text-clrMalibu"
                : " text-clrValentineRed"
            }`}
            icon={faAngleRight}
          />
        </Link>
      </div>
    </div>
  );
}
