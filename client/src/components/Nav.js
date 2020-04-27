import React from "react";
import "./Nav.css";

const Nav = (props) => (
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" id="brand" href="/">FauxFinance</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="btn btn-primary py-0" href="/articles">Articles</a>
                </li>
                <li class="nav-item">
                    <a class="btn btn-primary py-0" href="#">Forum</a>
                </li>
                <li class="nav-item">
                    <a class="btn btn-primary py-0" href="#">Sign In</a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Nav;

