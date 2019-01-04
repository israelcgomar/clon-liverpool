import React from 'react';
import { css } from 'react-emotion';
import { ClipLoader } from "react-spinners";
import './Loader.sass'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class LoaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
        <div className="container">
            <div className='sweet-loading'>
                <ClipLoader
                    className={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#CB1685'}
                    loading={this.state.loading}
                />
            </div>
        </div>
        )
    }
}