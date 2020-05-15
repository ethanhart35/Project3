import React from "react";
import "./Nav.css";
import API from "../utils/API";

const Nav = (props) => (
    <nav className="navbar navbar-light">
        <a className="navbar-brand" id="brand" href="/">FauxFinance</a>



        <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page">Articles</li>
  </ol>
</nav>



        <ul className="nav">
                <li className="nav-item active">
                    <a className="nav-link btn btn-primary py-0" href="/articles">Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-primary py-0" href="/market">Market</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-primary py-0" href="/login">Log In</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-primary py-0" onClick={API.logoutUser}>Log out</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-danger py-0"  id="btn"  href="/register">Register</a>
                </li>
            </ul>
    </nav>
);

export default Nav;

