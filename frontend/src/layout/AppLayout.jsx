import { Navigate, Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useUIStore from "../store/uiStore";
import { useAuth } from "../context/AuthContext";
import { Cart, Navigation, PageWrapper } from "../components";

export default function AppLayout() {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const closeCart = useUIStore((state) => state.closeCart);
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="flex h-screen bg-clrGhostWhite font-Quicksand ">
      {/*-----NAVIGATION----- */}
      <aside className="fixed z-30 h-screen w-[65px] bg-white">
        <Navigation />
      </aside>
      {/*-------MAIN------- */}
      <main className="relative ml-[65px] flex  flex-1 overflow-x-hidden">
        {/* ---PAGES--- */}
        <div className=" flex-1 border-clrValentineRed lg:mr-[350px]">
          <div className="mx-auto max-w-7xl  bg-clrCottonSeed/10">
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </div>
        </div>
        {/*----- OVERLAY---- */}
        <div
          onClick={closeCart}
          className={twMerge(
            "fixed  h-screen w-full bg-black/50 lg:hidden",
            `${isCartOpen ? "" : "hidden"}`
          )}></div>
        {/* -----CART---- */}
        <div
          className={twMerge(
            "absolute right-0 h-screen w-[350px] max-lg:w-[350px] max-lg:bg-clrRosyFinch max-xs:w-full  lg:block",
            `${isCartOpen ? "" : "hidden"}`
          )}>
          <Cart />
        </div>
      </main>
    </div>
  );
}
