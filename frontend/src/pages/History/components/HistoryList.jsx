/* eslint-disable react/prop-types */

import HistoryCard from "./HistoryCard";

// import HistoryCard from "./HistoryCard";

export default function HistoryList({ cartHistoryList }) {
  if (!cartHistoryList || cartHistoryList.length === 0) {
    return (
      <div className="grid h-[50vh] place-content-center">
        <p className="text-xl">No History Yet</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          {cartHistoryList.map((cartHistoryItem, id) => (
            <div key={id}>
              <p className="mb-3 text-xs">{cartHistoryItem?.month}</p>
              <div className="mb-6 flex flex-col gap-6">
                {cartHistoryItem.items.map((item) => (
                  <HistoryCard key={item?._id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
