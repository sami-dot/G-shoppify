import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import AppLayout from "./layout/AppLayout";
import Main from "./pages/Main";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layout/AuthLayout";
import HistoryDetail from "./pages/History/components/HistoryDetail";
// const HistoryDetail = lazy(() =>
//   import("./pages/History/components/HistoryDetail")
// );

export default function App() {
  return (
    <div className="">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* private routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Main />} />
          <Route path="history" element={<History />} />
          <Route path="history/:id" element={<HistoryDetail />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}
