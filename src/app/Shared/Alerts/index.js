// import React from 'react';
// import Alert from 'react-s-alert';

// export default class Alerts extends React.Component {
    
//     constructor(props) {
//         super(props);
//     }

//     handleConfirm() {
//         console.log('Customer confirmation!');
//         Alert.close(this.props.id);
//     }

//     render() {
//         return (
//             <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
//                 <div className='s-alert-box-inner'>
//                     {this.props.message}
 
//                     {/* use this api to customize alert style */}
//                     {this.props.condition}
//                 </div>
//                 <h3>{this.props.customFields.customerName}</h3>
//                 <button onClick={this.handleConfirm.bind(this)}>Confirm</button>
//                 <span className='s-alert-close' onClick={this.props.handleClose}></span>
//             </div>
//         )
//     }
// }