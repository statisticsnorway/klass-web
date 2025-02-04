import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { TranslateComponent } from "../lib/languageUtils";

const App = () => {
  const classification = useSelector(
    (state) => state.selectedClass?.classification
  );
  const classificationName = classification?.name?.trim() || "";

  const renderBreadcrumbs = () => (
    <div id="navigation-path">
      <h2 className="screen-reader-only">
        <TranslateComponent content="COMMON.YOU_ARE_HERE" />:
      </h2>
      <span>
        <a href="//www.ssb.no/">Forsiden</a> &nbsp;&gt;&nbsp;
      </span>
      <span>
        <a href="//www.ssb.no/metadata/">Metadata</a> &nbsp;&gt;&nbsp;
      </span>
      <span>
        <Link to="/">Klassifikasjoner og kodelister (Klass)</Link>
      </span>
      {classificationName && <span>&nbsp;&gt;&nbsp;{classificationName}</span>}
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
