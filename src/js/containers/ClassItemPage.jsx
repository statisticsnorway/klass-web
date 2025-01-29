import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import * as ClassActions from "../actions";
import _ from "lodash";
import moment from "moment";
import { translate, TranslateComponent } from "../lib/languageUtils";

const loadData = (props, selectedLanguage) => {
  const { params, actions } = props;
  if (selectedLanguage) {
    sessionStorage.setItem("selectedAPILanguage", selectedLanguage);
  }

  function checkPublishStatus(v, classification) {
    const apiLang = sessionStorage.getItem("selectedAPILanguage");
    if (v.published.indexOf(apiLang) === -1) {
      const selectedLang = sessionStorage.getItem("selectedLanguage");
      if (v.published.indexOf(selectedLang) === -1) {
        return classification.primaryLanguage;
      } else {
        return selectedLang;
      }
    }
    return null;
  }

  actions.getClassification(params.classId).then(function (res) {
    const classification = res.response;
    if (!_.isEmpty(classification) && !_.isEmpty(classification.versions)) {
      let selectedVersion = classification.versions[0];
      let versionId = params.versionId;
      if (!versionId) {
        let currentValidVersion = classification.versions.filter((v) =>
          moment(new Date()).isBetween(v.validFrom, v.validTo, "day", [])
        );
        versionId = !_.isEmpty(currentValidVersion)
          ? _.head(currentValidVersion).id
          : selectedVersion.id;
      }

      let overrideLanguage = checkPublishStatus(
        selectedVersion,
        classification
      );
      _.forEach(classification.versions, function (v) {
        if (v.id === versionId) {
          overrideLanguage = checkPublishStatus(v, classification);
          selectedVersion = v;
          return false;
        }
      });
      actions.loadVersion(versionId, overrideLanguage);

      let toDate = "";
      if (selectedVersion.validTo !== undefined) {
        toDate = moment(selectedVersion.validTo).isValid()
          ? moment(selectedVersion.validTo).format("YYYY-MM-DD")
          : "";
      }

      if (!_.isEmpty(selectedVersion)) {
        const query = {
          from: moment(selectedVersion.validFrom)
            .subtract(1, "days")
            .format("YYYY-MM-DD"),
          to: toDate,
          includeFuture: true,
        };
        actions.loadChanges(params.classId, query, overrideLanguage);
      }
    }
  });
};

const ClassItemPage = ({
  classification,
  selectedVersion,
  isFetching,
  actions,
  params,
  modal,
}) => {
  const descriptionRef = useRef(null);
  const descLinkRef = useRef(null);
  const shortDescLinkRef = useRef(null);

  useEffect(() => {
    loadData({ params, actions });
  }, [params, actions]);

  useEffect(() => {
    if (params.versionId !== selectedVersion.version.id) {
      loadData({ params, actions });
    }
  }, [params.versionId, selectedVersion.version.id, actions]);

  useEffect(() => {
    const element = descriptionRef.current;
    if (element === null) return;
    const hasOverflowingChildren =
      element.offsetHeight < element.scrollHeight ||
      element.offsetWidth < element.scrollWidth;
    if (
      !hasOverflowingChildren &&
      descLinkRef.current.getAttribute("class") !== "hide"
    ) {
      descLinkRef.current.setAttribute("class", "hide");
    }
  }, [selectedVersion]);

  const renderTabs = () => {
    if (
      (_.isEmpty(selectedVersion.version) ||
        (params.versionId &&
          selectedVersion.version.id !== params.versionId)) &&
      selectedVersion.isFetching
    ) {
      return (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      );
    }

    return (
      <Tabs
        classification={classification}
        selectedVersion={selectedVersion}
        actions={actions}
        isFetchingClass={isFetching}
        params={params}
        modal={modal}
      />
    );
  };

  const showFullDescription = (ev) => {
    descriptionRef.current.setAttribute("class", "description");
    descLinkRef.current.setAttribute("class", "hide");
    shortDescLinkRef.current.setAttribute("class", "clickable");
  };

  const hideFullDescription = (ev) => {
    descriptionRef.current.setAttribute("class", "description short");
    descLinkRef.current.setAttribute("class", "clickable");
    shortDescLinkRef.current.setAttribute("class", "hide");
  };

  if (_.isEmpty(classification)) {
    return (
      <TranslateComponent
        component="p"
        content="CLASSIFICATIONS.NO_CLASS_FOUND"
      />
    );
  }

  if (_.isEmpty(classification) || isFetching) {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
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
            <b>{classification.statisticalUnits[0]}</b>
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
            +
            <TranslateComponent content="CLASS_ITEM.READ_MORE" />
          </p>
          <p
            className="hide"
            ref={shortDescLinkRef}
            onClick={hideFullDescription}
          >
            -
            <TranslateComponent content="CLASS_ITEM.READ_LESS" />
          </p>
        </div>
        {renderTabs()}
      </div>
      <Sidebar
        contactInfo={classification.contactPerson}
        languages={selectedVersion.version.published}
        onLanguageChange={loadData}
        actions={actions}
        params={params}
      />
      <div className="clear-fix" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  classification: state.selectedClass.classification,
  selectedVersion: state.selectedVersion,
  isFetching: state.selectedClass.isFetching,
  modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ClassActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassItemPage);
