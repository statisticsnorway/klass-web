import "./List.scss";
import PropTypes from "prop-types";
import React from "react";
import ReduxListItem from "./items/ReduxListItem";
import CodeListItem from "./items/CodeListItem";
import { translate } from "../../lib/languageUtils";

const List = ({
  items = [],
  type,
  actions,
  modal,
  translations,
  isFetching = true,
  loadingLabel = translate("LOADING.CLASSIFICATIONS_AND_CODELISTS"),
}) => {
  const renderList = () => {
    if (items.length) {
      return items.map((item, key) => {
        let name;
        switch (type) {
          case "code":
            name = (
              <span className="itemName">
                <b>{item.code}</b> -{" "}
                <span className="longName">{item.name}</span>
                <span className="shortName" aria-hidden="true">
                  {item.shortName}
                </span>
              </span>
            );
            return (
              <CodeListItem
                key={type + key}
                idx={key}
                item={item}
                displayName={name}
                type={type}
                actions={actions}
                modal={modal}
                translations={translations}
              />
            );
          case "variant":
            name = (
              <span className="itemName">
                <b>{item.code}</b> -{" "}
                <span className="longName">{item.name}</span>
              </span>
            );
            return (
              <CodeListItem
                key={type + key}
                idx={key}
                item={item}
                displayName={name}
                type={type}
                actions={actions}
                modal={modal}
                translations={translations}
              />
            );
          case "classFamilies":
            name = (
              <span>
                {item.name} ({item.numberOfClassifications})
              </span>
            );
            break;
          default:
            name = <span>{item.name}</span>;
        }

        if (item.numberOfClassifications || item.code) {
          return (
            <ReduxListItem
              key={type + key}
              idx={key}
              item={item}
              displayName={name}
              type={type}
              actions={actions}
              modal={modal}
            />
          );
        }
      });
    }
  };

  if (!items.length && isFetching) {
    return (
      <p>
        <i>{loadingLabel}</i>
      </p>
    );
  }

  return (
    <ol className="expandcollapse" role="tree">
      {renderList()}
    </ol>
  );
};

List.propTypes = {
  modal: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  items: PropTypes.array,
  isFetching: PropTypes.bool,
  type: PropTypes.string.isRequired,
  translations: PropTypes.object,
  loadingLabel: PropTypes.string,
};

export default List;
