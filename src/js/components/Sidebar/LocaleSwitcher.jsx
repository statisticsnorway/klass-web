import PropTypes from "prop-types";
import React, { Component } from "react";
import config from "../../config";

function getLocale() {
  if (sessionStorage.getItem("selectedAPILanguage")) {
    return sessionStorage.getItem("selectedAPILanguage");
  } else if (sessionStorage.getItem("selectedLanguage")) {
    return sessionStorage.getItem("selectedLanguage");
  }
  return "nb";
}

class LocaleSwitcher extends Component {
  handleChange(e) {
    const { languages, onLanguageChange } = this.props;
    onLanguageChange(this.props, e.target.value);
  }

  render() {
    const { languages, onLanguageChange } = this.props;
    if (!onLanguageChange) {
      return null;
    }
    if (Array.isArray(languages)) {
      return (
        <div className="language-selector">
          <p>
            <TranslateComponent content="LANGUAGE.CHOOSE_LANGUAGE" />
          </p>
          <select
            defaultValue={getLocale()}
            onChange={this.handleChange.bind(this)}
          >
            {languages.indexOf(config.LANGUAGES.BOKMAL) > -1 ? (
              <TranslateComponent
                component="option"
                value={config.LANGUAGES.BOKMAL}
                content="LANGUAGE.NORWEGIAN"
              />
            ) : null}
            {languages.indexOf(config.LANGUAGES.NYNORSK) > -1 ? (
              <TranslateComponent
                component="option"
                value={config.LANGUAGES.NYNORSK}
                content="LANGUAGE.NYNORSK"
              />
            ) : null}
            {languages.indexOf(config.LANGUAGES.ENGLISH) > -1 ? (
              <TranslateComponent
                component="option"
                value={config.LANGUAGES.ENGLISH}
                content="LANGUAGE.ENGLISH"
              />
            ) : null}
          </select>
        </div>
      );
    } else {
      return null;
    }
  }
}

LocaleSwitcher.propTypes = {
  languages: PropTypes.array,
  onLanguageChange: PropTypes.func,
  params: PropTypes.object,
  actions: PropTypes.object,
};

export default LocaleSwitcher;
