import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import { useLoginUser } from "../../lib/react-query/queries";
import { twMerge } from "tailwind-merge";
import { LoaderCircle } from "lucide-react";
export default function Login() {
  const { setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const inputChangeHandler = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  // Query
  const { mutateAsync: loginUser, isPending: isLogging } = useLoginUser();

  // handler
  const loginHandler = async (e) => {
    e.preventDefault();

    // check the form validity
    if (!email || !password) {
      toast.error("All Fields are required");
      return;
    }

    try {
      const {
        data: { payload },
      } = await loginUser(formData);
      // console.log({ payload });
      // set the logged in user
      setUser({
        email: payload?.user?.email,
        username: payload?.user?.username,
        _id: payload?.user?._id,
      });

      setIsAuthenticated(true);

      // save the token to cookie
      let token = payload.token;
      Cookies.set("sh_token", token, { expires: 7 });

      // show toast and navigate to home page
      toast.success(payload?.message);
      navigate("/", { replace: true });
    } catch (error) {
      // console.log({ error });
      if (error?.response?.data?.errors.length > 0) {
        let errors = error?.response?.data?.errors;
        errors.forEach((err) => {
          let val = Object.values(err);
          toast.error(val[0]);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <>
      <div className="grid h-screen  bg-clrShowDrift  font-Quicksand  ">
        <div className="absolute mt-8 w-full text-center">
          <img className="mx-auto block w-24" src="./logo.svg" alt="" />
          <h1 className="font-Quicksand text-5xl font-semibold text-clrOrangePeel">
            Shoppingify
          </h1>
        </div>
        <div className="flex items-center justify-center bg-clrYellowishOrange px-10">
          <form
            onSubmit={loginHandler}
            className="w-96 rounded-xl border bg-white px-10 py-5 shadow-2xl">
            <h2 className="mb-3 text-center text-2xl font-semibold text-clrOrangePeel">
              Login
            </h2>
            <div className="my-2">
              <label className="text-xs text-clrGranite" htmlFor="email">
                Email
              </label>
              <input
                disabled={isLogging}
                className="disabled: w-full rounded-md border border-clrGranite px-2 py-2 text-sm outline-clrOrangePeel disabled:border-clrGranite/40 disabled:bg-slate-100"
                type="text"
                onChange={inputChangeHandler("email")}
                autoComplete="off"
              />
            </div>
            <div className="my-2">
              <label className="text-xs text-clrGranite" htmlFor="password">
                Password
              </label>
              <input
                disabled={isLogging}
                className="w-full rounded-md border border-clrGranite px-2 py-2 text-sm outline-clrOrangePeel disabled:border-clrGranite/40 disabled:bg-slate-100"
                type="password"
                onChange={inputChangeHandler("password")}
                id="password"
                autoComplete="off"
              />
            </div>
            <button
              disabled={isLogging}
              className={twMerge(
                "mb-2 mt-4 block w-full rounded-md bg-clrOrangePeel  px-2 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-clrOrangePeel disabled:opacity-60"
              )}>
              {isLogging ? (
                <LoaderCircle className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
            <small>
              Not Registered yet ?
              <Link to={"/register"}>
                <span className="ml-2 cursor-pointer text-clrOrangePeel">
                  Register
                </span>
              </Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}
