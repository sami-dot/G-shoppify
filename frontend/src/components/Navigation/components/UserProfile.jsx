import { useAuth } from "../../../context/AuthContext";

export default function UserProfile() {
  const handleLogout = () => {
    logoutUser();
  };
  const { logoutUser, user } = useAuth();
  return (
    <>
      <div className="absolute -right-64 top-10 z-10 flex  w-72  flex-col justify-between rounded-xl border border-clrOrangePeel bg-white  px-5 py-5 ">
        <p className="mb-2 flex gap-2 text-sm">
          <span className="font-bold">Username: </span>
          <span>{user.username}</span>
        </p>
        <p className="mb-2 flex gap-2 text-sm">
          <span className="font-bold">Email: </span>
          <span>{user.email}</span>
        </p>
        <p
          onClick={handleLogout}
          className=" w-fit cursor-pointer rounded-xl bg-clrValentineRed px-2 py-1 text-center text-xs text-white">
          logout
        </p>
      </div>
    </>
  );
}
