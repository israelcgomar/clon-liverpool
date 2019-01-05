import React, { Component } from "react";
import { InputSearch } from "../Shared/Inputs/Inputs";
import "./allArticles.sass";
// import LoaderComponent from "../Shared/Loader";


const API = "http://localhost:8010/api/v1/";

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      search: "",
      timeLoader: ''
    };
  }

  onchange = e => {
    this.setState({ search: e.target.value });
      const url = `${API}articles-liverpool/${this.state.search}`;
      fetch(url)
        .catch(err => err)
        .then(res => res.json())
        .then(articles => {
          this.setState(articles);
        });
  };


  renderArticles = article => {
    return (
      <div className="Articles custom__card">
        <h3 className="lead"> {article.name}</h3>
        <p className="lead__gray">{article.price}</p>
        <div className="img__content">
          <img className="article__img" src={article.img} alt="6_dias" />
        </div>
        <p className="lead__gray">Finaliza: 03 de julio 2015</p>
        <button className="btn__table btn__detail">Detalle</button>
      </div>
    );
  };

  render() {
    const { search } = this.state;

    // if (this.state.articles.length > 0) {
      return <div>
          <InputSearch 
          name='search'
          label="Buscar Articulos" 
          value={search}
          onChange={this.onchange}
          />
          <br />
          <div className="container__articles">
          {this.state.articles.map((article, i) => {
              return <div key={i}>{this.renderArticles(article)}</div>;
            })}
          {/* <LoaderComponent /> */}
          </div>
        </div>;
    // } else {
    //   return <LoaderComponent />
    // }
  }
}
