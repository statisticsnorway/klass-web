import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import * as ClassActions from "../actions";
import _ from "lodash";
import moment from "moment";
import { translate, TranslateComponent } from "../lib/languageUtils";

function checkPublishStatus(version, classification) {
  const apiLang = sessionStorage.getItem("selectedAPILanguage");
  if (!version?.published?.includes(apiLang)) {
    const selectedLang = sessionStorage.getItem("selectedLanguage") || "nb";
    return version?.published?.includes(selectedLang)
      ? selectedLang
      : classification.primaryLanguage;
  }
  return null;
}

// Helper to load data for a given classId/versionId
function loadData(classId, versionId, actions) {
  actions.getClassification(classId).then((res) => {
    const classification = res.response;
    if (_.isEmpty(classification) || _.isEmpty(classification.versions)) {
      return;
    }

    // Fallback to first version if no versionId specified
    let selectedVersion = classification.versions[0];
    if (!versionId) {
      const currentValidVersion = classification.versions.filter((v) =>
        moment(new Date()).isBetween(v.validFrom, v.validTo, "day", [])
      );
      versionId = !_.isEmpty(currentValidVersion)
        ? _.head(currentValidVersion).id
        : selectedVersion.id;
    }

    let overrideLanguage = checkPublishStatus(selectedVersion, classification);

    // Find the matching version
    classification.versions.forEach((v) => {
      if (v.id === versionId) {
        overrideLanguage = checkPublishStatus(v, classification);
        selectedVersion = v;
      }
    });

    // Load version
    actions.loadVersion(versionId, overrideLanguage);

    // Optionally load changes
    if (!_.isEmpty(selectedVersion)) {
      const toDate = moment(selectedVersion.validTo).isValid()
        ? moment(selectedVersion.validTo).format("YYYY-MM-DD")
        : "";
      const query = {
        from: moment(selectedVersion.validFrom)
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        to: toDate,
        includeFuture: true,
      };
      actions.loadChanges(classId, query, overrideLanguage);
    }
  });
}

function ClassItemPage({
  classification,
  selectedVersion,
  isFetching,
  actions,
  modal,
}) {
  // React Router v6: read params with `useParams()`
  const { classId, versionId } = useParams();

  const descriptionRef = useRef(null);
  const descLinkRef = useRef(null);
  const shortDescLinkRef = useRef(null);

  // Load data whenever classId/versionId changes
  useEffect(() => {
    if (classId) {
      loadData(classId, versionId, actions);
    }
  }, [classId, versionId, actions]);

  // Hide 'Read more' link if content fits
  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;
    const hasOverflowingChildren =
      element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth;

    if (
      !hasOverflowingChildren &&
      descLinkRef.current?.getAttribute("class") !== "hide"
    ) {
      descLinkRef.current.setAttribute("class", "hide");
    }
  }, [classification, selectedVersion]);

  function showFullDescription() {
    descriptionRef.current.setAttribute("class", "description");
    descLinkRef.current.setAttribute("class", "hide");
    shortDescLinkRef.current.setAttribute("class", "clickable");
  }

  function hideFullDescription() {
    descriptionRef.current.setAttribute("class", "description short");
    descLinkRef.current.setAttribute("class", "clickable");
    shortDescLinkRef.current.setAttribute("class", "hide");
  }

  // Conditionally render the tabs
  function renderTabs() {
    if (_.isEmpty(selectedVersion?.version) && selectedVersion?.isFetching) {
      return (
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      );
    }
    return (
      <Tabs
        classification={classification}
        selectedVersion={selectedVersion}
        actions={actions}
        isFetchingClass={isFetching}
        modal={modal}
      />
    );
  }

  if (_.isEmpty(classification)) {
    return (
      <TranslateComponent
        component="p"
        content="CLASSIFICATIONS.NO_CLASS_FOUND"
      />
    );
  }

  if (isFetching || _.isEmpty(classification)) {
    return (
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }

  document.title = classification.name + translate("PAGE.TITLE_POSTFIX");

  return (
    <div className="content klass-item">
      <div className="main">
        <div className="heading">
          <p>
            <TranslateComponent content="CLASSIFICATIONS.STATISTICAL_UNIT" />:{" "}
            <b>{classification.statisticalUnits?.[0]}</b>
          </p>
          <h1>{classification.name}</h1>
          <p className="description short" ref={descriptionRef}>
            {classification.description}
          </p>
          <p
            className="clickable"
            ref={descLinkRef}
            onClick={showFullDescription}
          >
            +<TranslateComponent content="CLASS_ITEM.READ_MORE" />
          </p>
          <p
            className="hide"
            ref={shortDescLinkRef}
            onClick={hideFullDescription}
          >
            -<TranslateComponent content="CLASS_ITEM.READ_LESS" />
          </p>
        </div>
        {renderTabs()}
      </div>

      <Sidebar
        contactInfo={classification.contactPerson}
        languages={selectedVersion?.version?.published}
        onLanguageChange={() => loadData(classId, versionId, actions)}
        actions={actions}
      />

      <div className="clear-fix" />
    </div>
  );
}

const mapStateToProps = (state) => ({
  classification: state.selectedClass?.classification || {},
  selectedVersion: state.selectedVersion || { version: {} },
  isFetching: state.selectedClass?.isFetching ?? false,
  modal: state.modal || {},
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ClassActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassItemPage);
