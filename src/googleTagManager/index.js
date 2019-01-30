import React from 'react';
import gtmParts from "react-google-tag-manager";


class GoogleTagManager extends React.Component {
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';
        const script = document.createElement("script")
    
        if (!window[dataLayerName]) {
            const gtmScriptNode = document.getElementById(scriptId);
            const scriptText = document.createTextNode(gtmScriptNode.textContent)
            script.appendChild(scriptText);
            document.head.appendChild(script)
        }
    }

    render() {
        const gtm = gtmParts({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
        });
 
        return (
            <div>
                <div>{gtm.noScriptAsReact()}</div>
                <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
                    {gtm.scriptAsReact()}
                </div>
            </div>
        );
    }
}

export default GoogleTagManager;