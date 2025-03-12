import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="grid h-[40vh] place-content-center">
      <div className="mx-auto max-w-sm space-y-2 p-10 text-center">
        <h1 className="text-5xl font-semibold">404</h1>
        <p className="text-2xl">page not found</p>
        <button
          onClick={goHome}
          className="rounded-md bg-clrOrangePeel p-2 text-white hover:bg-clrOrangePeel/80">
          Go Home
        </button>
      </div>
    </div>
  );
}
