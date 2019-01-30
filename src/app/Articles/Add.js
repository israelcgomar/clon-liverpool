import React, { Component } from "react";
// import TagManager from 'react-gtm-module'


import { Input, InputImage } from "../Shared/Inputs/Inputs";
import GTM from "../Shared/Taggin"

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

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


export default class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: null,
      name: null,
      selectedFile: null,

      formErrors: {
        error: "",
        price: "",
        name: ""
      }
    };
    this.sendForm = this.sendForm.bind(this);
  }


  /**
   * Send Image
   */
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };


  /**
   * Send Form
   */
  async sendForm(ev) {
    ev.preventDefault();
  
    /**
     * GTM SEND INFO
     */
        
  //   const tagManagerArgs = {
  //     gtmId: 'GTM-5G39HLJ',
   const data = {
          price: this.state.price,
          form: "addArticle",
          description: this.state.name,
          page: window.location.pathname
      };

      const _dataLayer = await this.getTaggingData(data);
      console.log(_dataLayer);
      
      this.tagging.applyGTM('SearchProduct', _dataLayer);
  
  //     dataLayerName: 'AddArticle'
  // }
  // TagManager.initialize(tagManagerArgs)

    if (formValid(this.state)) {

      const formData = new FormData();
      formData.append('name', this.state.name);
      formData.append('price', this.state.price);
      formData.append("file", this.state.selectedFile, this.state.selectedFile.name);

      const url = `${API}articles-image`;
      const body = {
        method: "POST",
        body: formData
      };
      const response = await fetch(url, body);
      const res = await response.json();

      if (res.success === false) {
        Alert.error(res.message, {
          position: 'top',
          effect: 'slide',
          beep: true,
          offset: 172,
          timeout: 3500
        });
      } else {
        Alert.success('El articulo se agrego exitosamente', {
          position: 'top',
          effect: 'slide',
          beep: true,
          offset: 172,
          timeout: 3500
        });
      }


    } else {
      
      Alert.error('Ingrese los datos del formulario', {
        position: 'top',
        effect: 'slide',
        beep: true,
        offset: 172,
        timeout: 2500
    });

    }
  }
  getTaggingData = (data) => {
    console.log(data);
    
    const _dataLayer = data
    _dataLayer.event = 'AddArticle';
    _dataLayer.Section = "";
    return _dataLayer;
  }
  /**
   * Validations
   */
  handleChange = e => {
    e.preventDefault();
    let regex = /^[0-9.]*$/;
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({name: this.state.name});
    
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
   * Form
   */
  render() {
    // console.log(window.location.pathname);
    
    const { formErrors, price, name } = this.state;
    console.log( this.tagging);
    
    return (
      <div className="Add">
        <form onSubmit={this.sendForm}>
            <div>
            <Alert 
            stack={{limit: 5}} 
            />
            </div>
            <GTM ref={tagging => this.tagging = tagging} />
           
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

           <InputImage 
            label='Imagen de Articulo'
            type="file"
            name="upload"
            onChange={this.fileChangedHandler}
          />

          <button className="btn__primary__fat">Guardar</button>
        </form>
      </div>
    );
  }
}
