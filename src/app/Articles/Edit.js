import React, { Component } from 'react';
import TagManager from 'react-gtm-module';


import { Input, Select } from '../Shared/Inputs/Inputs';
import _ from "lodash";

const API = "http://localhost:8010/api/v1/";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      id: '',
      price: null,
      name: null,

      formErrors: {
        error: "",
        price: "",
        name: ""
      }
    };
    this.sendForm = this.sendForm.bind(this);
  }

/**
 * Get Articles
 */
componentDidMount() {
    const url = `${API}articles`;
    fetch(url)
      .catch(err => err)
      .then(res => res.json())
      .then(articles => this.setState(articles));
  }

  /**
   * Validations
   */
  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;


    let filterId = _.filter(this.state.articles, o => {
      if (o.name === value) return o;
    });

    for (let i = 0; i < filterId.length; i++) {
      this.setState({ id: filterId[i]._id });
    }

    let regex = /^[0-9.]*$/;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        if (!value.length)
          return (formErrors.price = "Ingrese el nombre del artículo");

        formErrors.name =
          value.length > 15 ? "Artículo de longitud inválida" : "";

        break;
      case "price":
        formErrors.price = regex.test(value)
          ? ""
          : "El precio del articulo debe ser de tipo númerico";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };


  /**
  * Send Form
  */
  async sendForm(ev) {
    ev.preventDefault();

    /**
     * Send Data GTM
     */
    const tagManagerArgs = {
      gtmId: 'GTM-5G39HLJ',
      dataLayer: {
          price: this.state.price,
          form: "editArticle",
          description: this.state.name,
          page: window.location.pathname
      },
      dataLayerName: 'editArticle'
    }
    TagManager.initialize(tagManagerArgs)

    if (formValid(this.state)) {
      const url = `${API}articles/${this.state.id}`;
      const data = { name: this.state.name, price: this.state.price }
      const body = {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, body);
      const res = await response.json();      
      this.setState({ error: res.error });
    } else {
      this.setState({ error: "Ingrese los datos del formulario" });
    }
  }


  render() {
    const { formErrors, price, name } = this.state;

    return <div className="Edit">
      <form onSubmit={this.sendForm}>

          <div className={this.state.error ? "msg error" : ""}>
            <i /> {this.state.error}
          </div>

          <Select 
          label="Articulos a editar"
          options={this.state.articles}
          onChange={this.handleChange}
          name="findArticles"
          />

          <Input
            error={formErrors.name.length > 0 ? "error" : null}
            label="Nombre de artículo"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            typeError={formErrors.name}
          />

          <Input
            error={formErrors.price.length > 0 ? "error" : null}
            label="Precio del artículo"
            type="text"
            value={price}
            onChange={this.handleChange}
            name="price"
            typeError={formErrors.price}
          />
        <button className="btn__primary__fat">Editar</button>
        </form>
      </div>;
  }
}
