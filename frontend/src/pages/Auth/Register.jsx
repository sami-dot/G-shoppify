import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
// import { registerUser } from "../../lib/api";
import { useRegisterUser } from "../../lib/react-query/queries";
import { twMerge } from "tailwind-merge";
const INITIAL_STATE = {
  username: "",
  password: "",
  email: "",
};
export default function Register() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { email, password, username } = formData;
  const navigate = useNavigate();
  const inputChangeHandler = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };
  // Query
  const { mutateAsync: registerUser, isPending: isRegistering } =
    useRegisterUser();

  // handler
  const registerHandler = async (e) => {
    e.preventDefault();
    // check if all fields are not empty
    if (!email || !password || !username) {
      toast.error("All Fields are required");
      return;
    }
    try {
      const { data } = await registerUser(formData);
      toast.success(data?.message);
      navigate("/login");
    } catch (error) {
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
      <div className="grid h-screen  bg-clrShowDrift  font-Quicksand ">
        <div className="absolute mt-4 w-full text-center">
          <img className="mx-auto block w-24" src="./logo.svg" alt="" />
          <h1 className="font-Quicksand text-5xl font-semibold text-clrOrangePeel">
            Shoppingify
          </h1>
        </div>
        <div className="flex items-center justify-center bg-clrYellowishOrange px-10">
          <form
            onSubmit={registerHandler}
            className="w-96 rounded-xl border bg-white px-10 py-5 shadow-2xl">
            <h2 className="mb-3 text-center text-2xl font-semibold text-clrOrangePeel">
              Create Account
            </h2>
            <div className="my-2">
              <label className="text-xs text-clrGranite" htmlFor="email">
                Email
              </label>
              <input
                disabled={isRegistering}
                className="w-full rounded-md border border-clrGranite px-2 py-2 text-sm outline-clrOrangePeel disabled:border-clrGranite/40 disabled:bg-slate-100"
                type="text"
                onChange={inputChangeHandler("email")}
                autoComplete="off"
              />
            </div>
            <div className="my-2">
              <label className="text-xs text-clrGranite" htmlFor="username">
                Username
              </label>
              <input
                disabled={isRegistering}
                className="w-full rounded-md border border-clrGranite px-2 py-2 text-sm outline-clrOrangePeel disabled:border-clrGranite/40 disabled:bg-slate-100"
                type="text"
                onChange={inputChangeHandler("username")}
                id="username"
                autoComplete="off"
              />
            </div>
            <div className="my-2">
              <label className="text-xs text-clrGranite" htmlFor="password">
                Password
              </label>
              <input
                disabled={isRegistering}
                className="w-full rounded-md border border-clrGranite px-2 py-2 text-sm outline-clrOrangePeel disabled:border-clrGranite/40 disabled:bg-slate-100"
                type="password"
                onChange={inputChangeHandler("password")}
                id="password"
                autoComplete="off"
              />
            </div>
            <button
              disabled={isRegistering}
              className={twMerge(
                "mb-2 mt-4 block w-full rounded-md bg-clrOrangePeel px-2 py-2 text-sm  text-white hover:bg-clrOrangePeel/80 disabled:cursor-not-allowed disabled:bg-clrOrangePeel disabled:opacity-60"
              )}>
              {isRegistering ? (
                <LoaderCircle className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                "Register"
              )}
            </button>
            <small>
              Already registered ?
              <Link to={"/login"}>
                <span className=" ml-2 cursor-pointer text-clrOrangePeel">
                  Login
                </span>
              </Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}
