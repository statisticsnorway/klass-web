import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './containers/App';
import ClassFamiliesPage from './containers/ClassFamiliesPage';
import ClassItemPage from './containers/ClassItemPage';
import SearchPage from './containers/SearchPage';
import NotFoundView from './views/NotFoundView';

export default (
  <Route path="/" name="Klassifikasjoner og kodelister" component={App}>
    <IndexRoute component={ClassFamiliesPage} />
	<Route path="klassifikasjoner" component={ClassItemPage} name="exclude">
        <Route path=":classId(/versjon/:versionId)(/:tab)(/:itemId)" component={ClassItemPage} />
	</Route>
	<Route path="sok" name="Søkeresultat" component={SearchPage} />
    <Route path="404" name="404: Fant ingen sider" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
