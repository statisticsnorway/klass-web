import React from "react";
import { TranslateComponent } from "../../lib/languageUtils";

const ApiLinks = () => {
  return (
    <div id="apiLinks">
      <h2>
        <TranslateComponent content="API.API_HEADER" />
      </h2>
      <div className="side-content-wrapper">
        <a className="apilink" href="//data.ssb.no/api/klass/v1/api-guide.html">
          <TranslateComponent content="API.API_LINK" />
        </a>
      </div>
    </div>
  );
};

export default ApiLinks;
