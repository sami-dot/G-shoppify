import { LoaderCircle } from "lucide-react";
export default function FullSpinner() {
  return (
    <>
      <div className="grid h-screen place-content-center">
        <LoaderCircle className=" h-10 w-10 animate-spin text-clrOrangePeel" />
      </div>
    </>
  );
}
