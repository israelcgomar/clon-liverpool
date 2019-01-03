import React, { Component } from 'react';
import { Select } from '../Shared/Inputs/Inputs';
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


export default class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      id: '',
      formErrors: {
        error: ""
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
    const { value } = e.target;
    let filterId = _.filter(this.state.articles, o => {
      if (o.name === value) return o;
    });

    for (let i = 0; i < filterId.length; i++) {
      this.setState({ id: filterId[i]._id });
    }
  };

  /**
  * Send Form
  */
  async sendForm(ev) {
    ev.preventDefault();

    if (formValid(this.state)) {
      const url = `${API}articles/${this.state.id}`;
      const body = {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, body);
      const res = await response.json();      
      this.setState({ error: res.error });
    } else {
      this.setState({ error: "Ingrese los datos del formulario" });
    }
  }

  render() {
    return <div className="Delete">
      <form onSubmit={this.sendForm}>
          <div className={this.state.error ? "msg error" : ""}>
            <i /> {this.state.error}
          </div>
          <Select label="Articula a Eliminar" options={this.state.articles} onChange={this.handleChange} name="findArticles" />
          <button className="btn__pb">Eliminar</button>
        </form>
      </div>;
  }
}

