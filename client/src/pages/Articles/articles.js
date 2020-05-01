import React, { Component } from "react";
import Nav from '../../components/Nav';
import API from '../../utils/API';
// var cheerio = require("cheerio");
// var axios = require("axios");


class Articles extends Component {
    state = {
      articles: []
    };
  
    componentDidMount() {
      this.loadArticles();
    }
  
    loadArticles = () => {
      API.scrape()
        .then(res => this.setState({ articles: res.data }))
        .catch(err => console.log(err));
    };
  
    render() {
      return (
        <div>
            <Nav/>
            <br/>
            <br/>
                <h1>Articles</h1>
            <div>{this.state.articles}</div>
        </div>
      );
    }
  }

export default Articles