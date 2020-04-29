import React from "react";
import "./Nav.css";

const Nav = (props) => (
    <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">FauxFinance</a>

        <ul className="nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/articles">Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/market">Market</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Sign In</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
            </ul>
    </nav>
);

export default Nav;

