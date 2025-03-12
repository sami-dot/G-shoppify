/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

export function NavItem({
  to = "#",
  icon = "",
  tooltipText = "",
  dataTooltipId = "",
}) {
  return (
    <>
      <NavLink
        to={to}
        data-tooltip-id={dataTooltipId}
        data-tooltip-place="left"
        className={({ isActive }) =>
          twMerge(
            " cursor-pointer border-l-4 border-l-transparent py-2 text-center text-2xl duration-300 hover:border-l-clrOrangePeel",
            isActive ? "border-l-clrOrangePeel" : ""
          )
        }>
        <FontAwesomeIcon icon={icon} />
        <Tooltip id={dataTooltipId}>
          <p className="text-xs">{tooltipText}</p>
        </Tooltip>
      </NavLink>
    </>
  );
}
