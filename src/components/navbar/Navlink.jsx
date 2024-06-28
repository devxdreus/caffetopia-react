/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";

export default function Navlink({ pathname, text, type }) {
  const location = useLocation();
  return (
    <NavLink
      to={pathname}
      className={({ isActive }) =>
        `${type === 'burger'
        ? 'flex items-center px-2 py-2 my-2 mt-5 rounded-xl'
        : 'flex items-center px-2 md:px-6 py-2 rounded-xl'
        }
        ${
          isActive ? "text-primary font-bold" : " "
        }`
      }
      state={{ from: {
        pathname: location.pathname,
      } }}
    >
      <p>{text}</p>
    </NavLink>
  )
}
