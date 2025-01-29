import React from "react";
import { TranslateComponent } from "../lib/languageUtils";

const App = ({ children }) => {
  const renderBreadcrumbs = () => (
    <div id="navigation-path">
      <h2 className="screen-reader-only">
        <TranslateComponent content="COMMON.YOU_ARE_HERE" />:
      </h2>
      <span>
        <a href="//www.ssb.no/">
          <TranslateComponent content="COMMON.FRONTPAGE" />
        </a>{" "}
        &gt;{" "}
      </span>
      <span>
        <a href="//www.ssb.no/metadata/">Metadata</a> &gt;{" "}
      </span>
    </div>
  );

  return (
    <div>
      {renderBreadcrumbs()}
      {children}
    </div>
  );
};

export default App;
