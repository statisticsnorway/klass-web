import "./Tabs.scss";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Codes from "./Codes";
import About from "./About";
import Changes from "./Changes";
import Versions from "./Versions";
import Correspondences from "./Correspondences";
import Variants from "./Variants";
import _ from "lodash";
import { Tabs } from "@statisticsnorway/ssb-component-library";

import moment from "moment";
import "moment/locale/nb.js";
import "moment/locale/nn.js";
import { translate, TranslateComponent } from "../../lib/languageUtils";
import { useNavigate } from "react-router-dom";

const TabsComponent = ({
  classification,
  selectedVersion,
  actions,
  isFetchingClass,
  params,
  modal,
}) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    if (sessionStorage.getItem("selectedLanguage")) {
      moment.locale(sessionStorage.getItem("selectedLanguage"));
    } else {
      moment.locale("nb");
    }
  }, []);

  const renderVersionInfo = () => {
    const { version } = selectedVersion;
    let validTo = version.validTo;
    let validFrom = version.validFrom;

    if (validTo != null && moment(validTo).isBefore(new Date())) {
      return (
        <div className="version-info">
          <TranslateComponent
            component="p"
            content="TABS.VERSION_NO_LONGER_VALID"
            className="red-box"
          />
          <p>
            <TranslateComponent
              component="span"
              content="TABS.VERSION_EXPIRED"
            />
            :{" "}
            <b>
              ({moment(version.validFrom).format("MMMM YYYY")} -{" "}
              {moment(version.validTo).format("MMMM YYYY")})
            </b>
          </p>
        </div>
      );
    }
    if (validFrom != null && moment(validFrom).isAfter(new Date())) {
      return (
        <div className="version-info">
          <TranslateComponent
            component="p"
            content="TABS.VERSION_NOT_YET_VALID"
            className="green-box"
          />
          <p>
            <TranslateComponent
              component="span"
              content="TABS.VERSION_FUTURE"
            />
            :{" "}
            <b>
              (<TranslateComponent content="TABS.VALID_FROM" />{" "}
              {moment(version.validFrom).format("MMMM YYYY")})
            </b>
          </p>
        </div>
      );
    } else {
      return (
        <p className="version-info">
          <TranslateComponent component="span" content="TABS.CURRENT_VERSION" />
          :{" "}
          <b>
            (<TranslateComponent content="TABS.VALID_FROM" />{" "}
            {moment(version.validFrom).format("MMMM YYYY")})
          </b>
        </p>
      );
    }
  };

  const handleTabClick = (path) => {
    const classPath = "/" + params.classId;
    const versionPath = params.versionId ? "/versjon/" + params.versionId : "";
    const pathWithTab =
      "/klassifikasjoner" + classPath + versionPath + "/" + path;
    navigate(pathWithTab); // Use navigate instead of history.push
  };

  if (isFetchingClass) {
    return (
      <TranslateComponent
        component="div"
        content="TABS.LOADING_CURRENT_VERSION"
      />
    );
  } else if (_.isEmpty(selectedVersion.version)) {
    return (
      <TranslateComponent content="TABS.VERSIONS_NOT_FOUND" component="p" />
    );
  }

  const tabItems = [
    {
      title: translate("TABS.CODES.CODES"),
      path: "koder",
      content: (
        <Codes
          key="Codes"
          classification={classification}
          version={selectedVersion.version}
          params={params}
          actions={actions}
          modal={modal}
        />
      ),
    },
    {
      title: translate("TABS.ABOUT.ABOUT"),
      path: "om",
      content: (
        <About
          key="About"
          actions={actions}
          version={selectedVersion.version}
        />
      ),
    },
    {
      title: translate("TABS.CHANGES.CHANGES"),
      path: "endringer",
      content: (
        <Changes
          key="Changes"
          actions={actions}
          classification={classification}
          selectedVersion={selectedVersion}
          params={params}
        />
      ),
    },
    {
      title: translate("TABS.VERSIONS.VERSIONS"),
      path: "versjoner",
      content: (
        <Versions
          key="Versions"
          actions={actions}
          classification={classification}
        />
      ),
    },
    {
      title: translate("TABS.CORRESPONDENCES.CORRESPONDENCES"),
      path: "korrespondanser",
      content: (
        <Correspondences
          key="Correspondences"
          actions={actions}
          selectedVersion={selectedVersion}
          params={params}
        />
      ),
    },
    {
      title: translate("TABS.VARIANTS.VARIANTS"),
      path: "varianter",
      content: (
        <Variants
          key="Variants"
          actions={actions}
          selectedVersion={selectedVersion}
          params={params}
          modal={modal}
        />
      ),
    },
  ];

  const activeTab = params.tab ? params.tab : "koder";

  return (
    <div className="tabs">
      {renderVersionInfo()}
      <h2>{selectedVersion.version.name}</h2>

      <Tabs
        activeOnInit={activeTab}
        items={tabItems.map((tab) => ({ title: tab.title, path: tab.path }))}
        onClick={handleTabClick}
      />
      <div className="tab-content">
        {tabItems.find((tab) => tab.path === activeTab)?.content}
      </div>
    </div>
  );
};

TabsComponent.propTypes = {
  selectedVersion: PropTypes.object.isRequired,
  classification: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  isFetchingClass: PropTypes.bool.isRequired,
};

export default TabsComponent;
