import React, { Component } from "react";
import Nav from '../../components/Nav';
import API from '../../utils/API';
var cheerio = require("cheerio");


class Articles extends Component {
  state = {
    titleArr: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.scrape()
      .then(res => {
        this.setState({ titleArr: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Learn About Finance with up to date Articles</h1>
        {this.state.titleArr.map((item) => <a href={"https://www.nytimes.com/" + item.link}><h2>{item.title}</h2></a>)}
      </div>
    );
  }
}

export default Articles