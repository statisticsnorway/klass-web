import React from "react";
import { Outlet } from "react-router-dom";
import { TranslateComponent } from "../lib/languageUtils";

const App = () => {
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
      <Outlet />
    </div>
  );
};

export default App;
