import React, { Component } from "react";
/*
  Componentes
*/
import Edit from "./Edit";
import Delete from "./Delete";
import Add from "./Add";
/*
  Estilos
*/
import "./Articles.sass";

export default class StatesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Add: true,
      Edit: false,
      Delete: false
    };
  }

  statusAdd = () => {
    this.setState({
      Add: true,
      Edit: false,
      Delete: false
    });
  };

  statusEdit = () => {
    this.setState({
      Add: false,
      Edit: false,
      Delete: true
    });
  };

  statusDelete = () => {
    this.setState({
      Add: false,
      Edit: true,
      Delete: false
    });
  };
 
  render() {
    return (
      <div className="Articles">
        <div className="content__type__articles">
          <div className="content__options">
            <button
              className={this.state.Add ? "active" : null}
              onClick={this.statusAdd}
            >
              Agregar Artículo
            </button>
            <button
              className={this.state.Edit ? "active" : null}
              onClick={this.statusDelete}
            >
              Editar Artículo
            </button>
            <button
              className={this.state.Delete ? "active" : null}
              onClick={this.statusEdit}
            >
              Eliminar Artículo
            </button>
          </div>
        </div>

        <div className="content__articles">
          <div>
            {this.state.Edit ? <Edit /> : null}
            {this.state.Add ? <Add /> : null}
            {this.state.Delete ? <Delete /> : null}
          </div>
          <div>
          </div>
        </div>
      </div>
    );
  }
}
