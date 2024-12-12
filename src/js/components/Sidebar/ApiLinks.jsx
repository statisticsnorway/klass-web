import React, { Component } from "react";
import { TranslateComponent } from "../../lib/languageUtils";

class ApiLinks extends Component {
  render() {
    return (
      <div id="apiLinks">
        <h2>
          <TranslateComponent content="API.API_HEADER" />
        </h2>
        <div className="side-content-wrapper">
          <a
            className="apilink"
            href="//data.ssb.no/api/klass/v1/api-guide.html"
          >
            <TranslateComponent content="API.API_LINK" />
          </a>
        </div>
      </div>
    );
  }
}

ApiLinks.propTypes = {};

ApiLinks.defaultProps = {};

export default ApiLinks;
