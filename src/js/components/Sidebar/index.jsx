import "./Sidebar.scss";
import PropTypes from "prop-types";
import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import Contact from "./Contact";
import ApiLinks from "./ApiLinks";
import Subscription from "./Subscription";

const Sidebar = ({
  contactInfo,
  languages,
  onLanguageChange,
  actions,
  params,
}) => {
  const gotClassification = () => params !== undefined;

  return (
    <div className="sidebar">
      <LocaleSwitcher
        languages={languages}
        onLanguageChange={onLanguageChange}
        actions={actions}
        params={params}
      />
      <Contact contactInfo={contactInfo} />
      {gotClassification() && (
        <Subscription actions={actions} params={params} />
      )}
      <ApiLinks />
    </div>
  );
};

Sidebar.propTypes = {
  contactInfo: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Sidebar;
