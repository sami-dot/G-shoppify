import HistoryList from "./components/HistoryList";
import { useGetCartHistory } from "../../lib/react-query/queries";
import ErrorPage from "../../components/ErrorPage";
import { LoaderCircle } from "lucide-react";

export default function History() {
  const {
    data,
    isPending: isCartHistoryLoading,
    isError: isCartHistoryError,
  } = useGetCartHistory();

  const cartHistoryList = data?.data?.payload?.cartHistory;

  if (isCartHistoryError) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
  return (
    <section className="size-full pb-20">
      <header className="px-6 py-5">
        <h1 className=" text-2xl font-medium leading-tight lg:text-3xl ">
          <span className="font-semibold ">Shopping history</span>
        </h1>
      </header>
      <main className="size-full px-6 max-xs:px-4">
        {isCartHistoryLoading && (
          <div className="grid h-[calc(100vh-400px)] place-content-center">
            <LoaderCircle className="mx-auto animate-spin text-clrOrangePeel" />
          </div>
        )}

        {!isCartHistoryLoading && (
          <HistoryList cartHistoryList={cartHistoryList} />
        )}
      </main>
    </section>
  );
}
