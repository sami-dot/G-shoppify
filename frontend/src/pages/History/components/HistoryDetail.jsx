import {
  faArrowLeftLong,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useState } from "react";
// import { getCartHistoryById } from "../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCartHistoryById } from "../../../lib/react-query/queries";
import { customDateFormat } from "../../../utils";
import HistoryProductList from "./HistoryProductList";
import FullSpinner from "../../../components/Spinner/FullSpinner";
import ErrorPage from "../../../components/ErrorPage";

export default function HistoryDetail() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data,
    isPending: isCartHistoryLoading,
    isError: isCartHistoryError,
  } = useGetCartHistoryById(params.id);

  const cartDetail = data?.data?.payload?.cartDetail;

  const goBack = () => {
    navigate(-1);
  };

  if (isCartHistoryLoading) {
    return <FullSpinner />;
  }
  if (isCartHistoryError) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  return (
    <section className="pb-20">
      <header className="px-10 py-5">
        <div
          onClick={goBack}
          className="flex w-fit cursor-pointer items-center gap-2 py-2 pr-4 text-xs text-clrOrangePeel">
          <FontAwesomeIcon icon={faArrowLeftLong} />
          <p className="font-semibold">back</p>
        </div>
      </header>

      <main className="px-10">
        <div className="mb-5">
          <h1 className="mb-2 text-2xl font-semibold">
            {cartDetail?.info.name}
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-clrSliverSand">
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>{customDateFormat(cartDetail?.info.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {cartDetail?.items.map((category) => (
            <div key={category.categoryName}>
              <h4 className="mb-2 text-lg font-semibold">
                {category.categoryName}
              </h4>
              <HistoryProductList products={category.products} />
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
