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
          var $ = cheerio.load(res.data);
          var titleObjArr = [];
          $(".css-ye6x8s").each(function(){
            var titleObj = {
              title:$(this).children().children().children().children("h2").text(),
              link:$(this).children().children().children("a").attr("href")
            }
            titleObjArr.push(titleObj);
          })
          this.setState({ titleArr: titleObjArr });
          console.log(this.state)
        })
        .catch(err => console.log(err));
    };

    render() {
      return (
        <div>
            <Nav/>
            <br/>
            <br/>
            <div>
                <h1>Articles</h1>
                {this.state.titleArr.map((item) => <a href={"https://www.nytimes.com/" + item.link}><h2>{item.title}</h2></a>)}
            
            </div>
        </div>
      );
    }
  }

export default Articles