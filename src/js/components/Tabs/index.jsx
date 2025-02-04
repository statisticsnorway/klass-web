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
import { useNavigate, useParams } from "react-router-dom";

function TabsComponent({
  classification,
  selectedVersion,
  actions,
  isFetchingClass,
  modal,
}) {
  const navigate = useNavigate();
  // Grab URL parameters (classId, versionId, tab) from React Router v6
  const { classId, versionId, tab = "koder" } = useParams();

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("selectedLanguage") || "nb";
    moment.locale(storedLanguage);
  }, []);

  const version = selectedVersion?.version || {};

  const renderVersionInfo = () => {
    const validFrom = version.validFrom;
    const validTo = version.validTo;

    // Already loaded, safe to check validFrom/validTo
    if (validTo && moment(validTo).isBefore(new Date())) {
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
              ({moment(validFrom).format("MMMM YYYY")} -{" "}
              {moment(validTo).format("MMMM YYYY")})
            </b>
          </p>
        </div>
      );
    }

    if (validFrom && moment(validFrom).isAfter(new Date())) {
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
              {moment(validFrom).format("MMMM YYYY")})
            </b>
          </p>
        </div>
      );
    }

    return (
      <p className="version-info">
        <TranslateComponent component="span" content="TABS.CURRENT_VERSION" />:{" "}
        <b>
          (<TranslateComponent content="TABS.VALID_FROM" />{" "}
          {moment(validFrom).format("MMMM YYYY")})
        </b>
      </p>
    );
  };

  const handleTabClick = (targetPath) => {
    const versionPath = versionId ? `/versjon/${versionId}` : "";
    navigate(`/klassifikasjoner/${classId}${versionPath}/${targetPath}`);
  };

  // If still fetching classification data, show spinner or loading text
  if (isFetchingClass) {
    return (
      <TranslateComponent
        component="div"
        content="TABS.LOADING_CURRENT_VERSION"
      />
    );
  }

  // If the version is missing or empty, show "Versions not found"
  if (_.isEmpty(version)) {
    return (
      <TranslateComponent content="TABS.VERSIONS_NOT_FOUND" component="p" />
    );
  }

  // Prepare the tab items, passing needed props to child components
  const tabItems = [
    {
      title: translate("TABS.CODES.CODES"),
      path: "koder",
      content: (
        <Codes
          classification={classification}
          version={version}
          actions={actions}
          modal={modal}
        />
      ),
    },
    {
      title: translate("TABS.ABOUT.ABOUT"),
      path: "om",
      content: <About actions={actions} version={version} />,
    },
    {
      title: translate("TABS.CHANGES.CHANGES"),
      path: "endringer",
      content: (
        <Changes
          classification={classification}
          selectedVersion={selectedVersion}
          actions={actions}
        />
      ),
    },
    {
      title: translate("TABS.VERSIONS.VERSIONS"),
      path: "versjoner",
      content: <Versions actions={actions} classification={classification} />,
    },
    {
      title: translate("TABS.CORRESPONDENCES.CORRESPONDENCES"),
      path: "korrespondanser",
      content: (
        <Correspondences selectedVersion={selectedVersion} actions={actions} />
      ),
    },
    {
      title: translate("TABS.VARIANTS.VARIANTS"),
      path: "varianter",
      content: (
        <Variants
          selectedVersion={selectedVersion}
          actions={actions}
          modal={modal}
        />
      ),
    },
  ];

  return (
    <div className="tabs">
      {renderVersionInfo()}
      <h2>{version.name}</h2>
      <Tabs
        activeOnInit={tab}
        items={tabItems.map((item) => ({ title: item.title, path: item.path }))}
        onClick={handleTabClick}
      />
      <div className="tab-content">
        {tabItems.find((item) => item.path === tab)?.content ||
          tabItems[0].content}
      </div>
    </div>
  );
}

TabsComponent.propTypes = {
  classification: PropTypes.object.isRequired,
  selectedVersion: PropTypes.shape({
    version: PropTypes.object,
  }).isRequired,
  actions: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  isFetchingClass: PropTypes.bool.isRequired,
};

export default TabsComponent;
