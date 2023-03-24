import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { search } from "../../features/search/searchSlice";
function MainLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(search(e.target.value));
  };

  return (
    <Fragment>
      <nav className=" container relative py-3">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="flex-1 max-w-xs search-field group">
            <BiSearch className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500 " />
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Search Task"
              className="search-input"
              id="lws-searchTask"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </nav>
      {children}
    </Fragment>
  );
}

export default MainLayout;
