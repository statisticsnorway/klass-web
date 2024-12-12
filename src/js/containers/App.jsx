import React from "react";
import Breadcrumbs from "react-breadcrumbs";
import Translate from "react-translate-component";

const App = ({ routes, params, children }) => {
  const renderBreadcrumbs = () => (
    <div id="navigation-path">
      <h2 className="screen-reader-only">
        <Translate content="COMMON.YOU_ARE_HERE" />:
      </h2>
      <span>
        <a href="//www.ssb.no/">
          <Translate content="COMMON.FRONTPAGE" />
        </a>{" "}
        &gt;{" "}
      </span>
      <span>
        <a href="//www.ssb.no/metadata/">Metadata</a> &gt;{" "}
      </span>
      <Breadcrumbs
        routes={routes}
        params={params}
        itemClass="step"
        excludes={["exclude"]}
      />
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
