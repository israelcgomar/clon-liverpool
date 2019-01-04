import React from "react";
import { InputSearch } from "../../Shared/Inputs/Inputs";
import LoaderComponent from "../../Shared/Loader"

import "./card.sass";

const API = "http://localhost:8010/api/v1/";

export default class NewArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], search: "" }; 
  }

  async componentDidMount() {
    const url = `${API}articles`;
    fetch(url)
      .catch(err => err)
      .then(res => res.json())
      .then(articles => this.setState(articles));
  }

  renderArticles = article => {
    return <div className="AllArticles custom__card">
        <h3 className="lead"> {article.name}</h3>
        <p className="lead__gray">{article.price}</p>
        <div className="img__content">
        <img className="article__img" src={article.linkImage} alt="6_dias" />
        </div>
        <p className="lead__gray">Finaliza: 03 de julio 2015</p>
        <button className="btn__table btn__detail">Detalle</button>
      </div>;
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;
    const allArticles = this.state.articles;
    const filteredArticles = allArticles.filter(article => {
      return article.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    if (this.state.articles.length > 0) {
      return <div>
          <InputSearch 
            label="Buscar Articulos" 
            onChange={this.onchange} 
          />
          <br/>
           <div 
           className="container__articles">
              {filteredArticles.map((article, i) => {
              return <div key={i}>{this.renderArticles(article)}</div>;
            })}
          </div>
        </div>;
    } else {
      return (
      <LoaderComponent/>
      )
    }
  }
}
