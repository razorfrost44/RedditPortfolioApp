import React, { useState } from "react";
import "./Header.css";
import { FaRedditSquare } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../posts/postsSlice";

export function Header() {
  const dispatch = useDispatch();
  const [searchTermLocal, setSearchTermLocal] = useState("");
  // const searchTerm = useSelector(selectSearchTerm);

  // useEffect(() => {
  //     setSearchTermLocal(searchTerm);
  // }, [searchTerm]);

  function onSearchTermChange(event) {
    setSearchTermLocal(event.target.value);
  }

  function submitSearchTerm(event) {
    event.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  }

  return (
    <section className="header">
      <article className="headerLogoSection">
        <FaRedditSquare className="headerLogo" />
        <span className="headerTitle">Reddit Simple</span>
      </article>
      <article className="search">
        <form className="searchForm" onSubmit={submitSearchTerm}>
          <input
            type="text"
            placeholder="Search"
            value={searchTermLocal}
            onChange={onSearchTermChange}
            aria-label="Search Posts"
          />
          <button type="button" aria-label="Search" onClick={submitSearchTerm}>
            <HiSearchCircle />
          </button>
        </form>
      </article>
    </section>
  );
}
