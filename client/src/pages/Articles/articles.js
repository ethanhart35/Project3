import React, { Component } from "react";
import Nav from '../../components/Nav';
import API from '../../utils/API';
import "./articles.css"
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
      <div className="body">
        <div className="container">
          <div className="Articles p-4">
            <div className="card p-2">
              <h1>Learn About Finance with up to date Articles</h1>
            </div>
            <div className="card-columns">
              {this.state.titleArr.map((item) => {
                return (


                  <div className="card  mt-1" key={item.title}>
                    <div className="card-body">
                      <a className="font-weight-bold" href={"https://www.nytimes.com/" + item.link}> {item.title}</a>

                    </div>
                  </div>

                )
              })}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Articles