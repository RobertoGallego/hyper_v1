import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/logo-top.png";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #101010;
`;

const Button = styled.button`
  border-color: #db202c;
  color: #db202c;

  &:hover {
    background-color: #db202c;
  }
`;

const Navs = styled.a`
  color: #ffffff !important;

  &:hover {
    color: #db202c !important;
  }
`;

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  if (user) {
    return (
      <Nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <a className="navbar-brand" href="/">
          <img src={logoTop} alt="Hypertube" height="75" width="130" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Navs className="nav-link" href="/">Home</Navs>
            </li>
            <li className="nav-item">
              <Navs className="nav-link" href="/profile">Profile</Navs>
            </li>
            <li className="nav-item">
              <Navs className="nav-link" href="/" onClick={logout}>
                Logout
              </Navs>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 pr-sm-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button
              className="btn btn-outline-danger my-2 my-sm-0"
              type="submit"
            >
              Search
            </Button>
          </form>
        </div>
      </Nav>
    );
  } else {
    return <h4>Loading ...</h4>;
  }
}

export default MenuBar;
