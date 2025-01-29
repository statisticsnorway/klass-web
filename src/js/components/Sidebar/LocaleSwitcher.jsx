import PropTypes from "prop-types";
import React from "react";
import config from "../../config";
import { TranslateComponent } from "../../lib/languageUtils";

const getLocale = () => {
  if (sessionStorage.getItem("selectedAPILanguage")) {
    return sessionStorage.getItem("selectedAPILanguage");
  } else if (sessionStorage.getItem("selectedLanguage")) {
    return sessionStorage.getItem("selectedLanguage");
  }
  return "nb";
};

const LocaleSwitcher = ({ languages, onLanguageChange }) => {
  const handleChange = (e) => {
    onLanguageChange(e.target.value);
  };

  if (!onLanguageChange || !Array.isArray(languages)) {
    return null;
  }

  return (
    <div className="language-selector">
      <p>
        <TranslateComponent content="LANGUAGE.CHOOSE_LANGUAGE" />
      </p>
      <select defaultValue={getLocale()} onChange={handleChange}>
        {languages.indexOf(config.LANGUAGES.BOKMAL) > -1 && (
          <TranslateComponent
            component="option"
            value={config.LANGUAGES.BOKMAL}
            content="LANGUAGE.NORWEGIAN"
          />
        )}
        {languages.indexOf(config.LANGUAGES.NYNORSK) > -1 && (
          <TranslateComponent
            component="option"
            value={config.LANGUAGES.NYNORSK}
            content="LANGUAGE.NYNORSK"
          />
        )}
        {languages.indexOf(config.LANGUAGES.ENGLISH) > -1 && (
          <TranslateComponent
            component="option"
            value={config.LANGUAGES.ENGLISH}
            content="LANGUAGE.ENGLISH"
          />
        )}
      </select>
    </div>
  );
};

LocaleSwitcher.propTypes = {
  languages: PropTypes.array,
  onLanguageChange: PropTypes.func.isRequired,
  params: PropTypes.object,
  actions: PropTypes.object,
};

export default LocaleSwitcher;
