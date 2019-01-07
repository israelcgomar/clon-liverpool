import React, { Component } from 'react';
import { InputSearch } from '../Shared/Inputs/Inputs';
import './allArticles.sass';
// import LoaderComponent from "../Shared/Loader";

const API = 'http://localhost:8010/api/v1/';

export default class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			search: '',
			timeLoader: ''
		};
	}

	componentWillMount() {
		localStorage.getItem('articles') && this.setState(JSON.parse(localStorage.getItem('articles')));
	}

	componentDidMount() {
		const date = localStorage.getItem('contactsDate');
		const contactsDate = date && new Date(parseInt(date));
		const now = new Date();

		const dataAge = Math.round((now - contactsDate) / (1000 * 60)); // in minutes
		const tooOld = dataAge >= 1;

		if (tooOld) {
			// this.fetchData();
		} else {
			console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
		}
	}

  
	onchange = (e) => {
		this.setState({ search: e.target.value });
		setTimeout(() => {
			const url = `${API}articles-liverpool/${this.state.search}`;
			fetch(url)
				.catch((err) => err)
				.then((res) => res.json())
				.then((articles) => this.setState(articles));
		}, 3000);
	};

	// onSetResult = (articles, key) => {
	// 	this.setState(articles);
	// };

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('articles', JSON.stringify(nextState.articles));
		localStorage.setItem('articlesDate', Date.now());
	}

	renderArticles = (article) => {
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
		const { search, articles } = this.state;
		return (
			<div>
				<InputSearch name="search" label="Buscar Articulos" value={search} onChange={this.onchange} />
				<br />
				<div className="container__articles">
					{articles &&
						articles.map((article, i) => {
							return <div key={i}>{this.renderArticles(article)}</div>;
						})}
				</div>
			</div>
		);
	}
}
