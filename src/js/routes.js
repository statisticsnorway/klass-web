import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./containers/App";
import ClassFamiliesPage from "./containers/ClassFamiliesPage";
import ClassItemPage from "./containers/ClassItemPage";
import SearchPage from "./containers/SearchPage";
import NotFoundView from "./views/NotFoundView";
import Translate from "react-translate-component";

const classCode = (
  <Translate content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS" />
);

export default (
  <Route path="/" name={classCode} component={App}>
    <IndexRoute component={ClassFamiliesPage} />
    <Route path="klassifikasjoner/:classId" component={ClassItemPage} name="Klassifikasjon">
        <Route path=":tab" component={ClassItemPage} name="Tab" />
        <Route path=":tab/:itemId" component={ClassItemPage} name="Item" />
    </Route>

    <Route path="klassifikasjoner/:classId/versjon/:versionId" component={ClassItemPage} name="Versjon">
        <Route path=":tab" component={ClassItemPage} name="TabWithVersion" />
        <Route path=":tab/:itemId" component={ClassItemPage} name="ItemWithVersion" />
    </Route>
    <Route path="sok" name="Søkeresultat" component={SearchPage} />
    <Route path="404" name="404: Fant ingen sider" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
