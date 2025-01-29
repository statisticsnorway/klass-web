import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import App from "./containers/App";
import ClassFamiliesPage from "./containers/ClassFamiliesPage";
import ClassItemPage from "./containers/ClassItemPage";
import SearchPage from "./containers/SearchPage";
import NotFoundView from "./views/NotFoundView";
import { TranslateComponent } from "./lib/languageUtils";

const classCode = (
  <TranslateComponent content="CLASSIFICATIONS.CLASSIFICATIONS_AND_CODELISTS" />
);

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ClassFamiliesPage />} />
        <Route path="klassifikasjoner" element={<ClassItemPage />}>
          <Route
            path=":classId(/versjon/:versionId)(/:tab)(/:itemId)"
            element={<ClassItemPage />}
          />
        </Route>
        <Route path="sok" element={<SearchPage />} />
        <Route path="404" element={<NotFoundView />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
}
