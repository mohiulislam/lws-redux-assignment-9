import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { BiSearch } from "react-icons/bi";
function MainLayout({ children }) {
  return (
    <Fragment>
      <nav className=" container relative py-3">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src={Logo} />
          </Link>
          <div className="flex-1 max-w-xs search-field group">
            <BiSearch className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500 " />
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Search Task"
              className="search-input"
              id="lws-searchTask"
            />
          </div>
        </div>
      </nav>
      {children}
    </Fragment>
  );
}

export default MainLayout;
