import React from 'react';
import TagManager from 'react-gtm-module';

const LPGTMID = 'GTM-5G39HLJ';
console.log(LPGTMID, "<------------------------------------------------>");
const tagManagerArgs = {
  gtmId: LPGTMID,
};

class Tagging extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && window) {
      TagManager.initialize(tagManagerArgs);
    }
  }
  applyGTM(pageName, extraData) { // eslint-disable-line class-methods-use-this
    if (typeof window !== 'undefined' && window) {
      const _tagManagerArgs = {};
      _tagManagerArgs.dataLayerName = 'dataLayer';
      _tagManagerArgs.dataLayer = extraData;

      TagManager.dataLayer(_tagManagerArgs);
    }
  }

  render() {
    return null;
  }
}

export default Tagging;
