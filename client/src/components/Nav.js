import React from "react";
import "./Nav.css";

const Nav = (props) => (
    <nav className="navbar navbar-light">
        <a className="navbar-brand" id="brand" href="/">FauxFinance</a>

        <ul className="nav">
                <li className="nav-item active">
                    <a className="nav-link btn btn-primary py-0" href="/articles">Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn btn-primary py-0" href="/market">Market</a>
                </li>
                
                <li className="nav-item">
                    <a className="nav-link btn btn-primary py-0" href="/register">Register</a>
                </li>
                          
                <li className="nav-item">
                    <a className="nav-link btn btn-primary py-0"  id="btn"  href="/login">Sign In</a>
                </li>
            </ul>
    </nav>
);

export default Nav;

