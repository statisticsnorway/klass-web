import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router";

const ResultItem = ({ item, actions }) => {
  const url = item._links.self.href;
  const classId = url.substring(url.lastIndexOf("/") + 1);

  return (
    <div className="result-item">
      <h3>
        <Link
          to={`/klassifikasjoner/${classId}`}
          dangerouslySetInnerHTML={{ __html: item.name }}
        />
      </h3>
      <p
        className="result-snippet"
        dangerouslySetInnerHTML={{ __html: item.snippet }}
      />
    </div>
  );
};

ResultItem.propTypes = {
  actions: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default ResultItem;
