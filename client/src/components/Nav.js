import React from "react";
import "./Nav.css";
import API from "../utils/API";

const Nav = (props) => (
    <nav className="navbar" id ="navbar">
        <a className="navbar-brand" href="/">FauxFinance</a>

        <ul className="nav">
                <li className="nav-item active">
                    <a className="nav-link" id="articles-btn" href="/articles">Articles</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="market-btn" href="/market">Market</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn  py-0" id="login-btn" href="/login">Log In</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn  py-0" id="logout-btn" onClick={API.logoutUser}>Log out</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link btn  py-0" id="profile-btn" href="/profile">Profile</a>
                </li>
                          
                <li className="nav-item">
                    <a className="nav-link btn py-0"  id="register-btn"  href="/register">Register</a>
                </li>
            </ul>
    </nav>
);

export default Nav;

