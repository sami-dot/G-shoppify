import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid h-[40vh] place-content-center">
        <div className="mx-auto  space-y-2 p-10 text-center">
          <h1 className="text-5xl font-semibold">Something went wrong.</h1>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="rounded-md bg-clrOrangePeel p-2 text-white hover:bg-clrOrangePeel/80">
            Go Home
          </button>
        </div>
      </div>
    </>
  );
}
