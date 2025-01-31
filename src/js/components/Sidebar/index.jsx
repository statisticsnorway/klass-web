import "./Sidebar.scss";
import PropTypes from "prop-types";
import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import Contact from "./Contact";
import ApiLinks from "./ApiLinks";
import Subscription from "./Subscription";

const Sidebar = ({
  contactInfo = null,
  languages = [],
  onLanguageChange = () => {},
  actions = {},
  params = null,
}) => {
  return (
    <div className="sidebar">
      <LocaleSwitcher
        languages={languages}
        onLanguageChange={onLanguageChange}
        actions={actions}
        params={params}
      />
      <Contact contactInfo={contactInfo} />
      {params && <Subscription actions={actions} params={params} />}
      <ApiLinks />
    </div>
  );
};

Sidebar.propTypes = {
  contactInfo: PropTypes.object,
  languages: PropTypes.array,
  onLanguageChange: PropTypes.func,
  params: PropTypes.object,
  actions: PropTypes.object,
};

export default Sidebar;
