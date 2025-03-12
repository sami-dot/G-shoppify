import {
  faChartColumn,
  faListUl,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "./components/NavItem";

import CartIcon from "./components/CartIcon";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import useClickOutside from "../../hooks/useClickOutside";
import UserProfile from "./components/UserProfile";
export default function Navigation() {
  const [showOptions, setShowOptions] = useState(false);
  const onClickOutside = () => {
    setShowOptions(false);
  };
  const profileRef = useClickOutside(onClickOutside);

  return (
    <div className=" flex h-full flex-col gap-10 py-5">
      <div className="relative  mx-auto ">
        <img
          onClick={() => setShowOptions(!showOptions)}
          className="cursor-pointer"
          data-tooltip-id="profile"
          data-tooltip-place="left"
          src="./logo.svg"
          alt=""
        />
        <Tooltip id="profile">
          <p className="text-xs">Profile</p>
        </Tooltip>
        {showOptions && (
          <div ref={profileRef}>
            <UserProfile />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-10">
        <NavItem
          to="/"
          icon={faListUl}
          tooltipText="items"
          dataTooltipId="items-tooltip"
        />

        <NavItem
          to="/history"
          icon={faRotateRight}
          tooltipText="History"
          dataTooltipId="history-tooltip"
        />

        <NavItem
          to="/statistics"
          icon={faChartColumn}
          tooltipText="Statistics"
          dataTooltipId="statistics-tooltip"
        />
      </div>
      <CartIcon />
    </div>
  );
}
