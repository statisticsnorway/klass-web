import React, { Component } from "react";
import { Link } from "react-router";
import Breadcrumbs from "react-breadcrumbs";
import { connect } from "react-redux";
import Translate from "react-translate-component";

class App extends Component {
  renderBreadcrumbs() {
    return (
      <div id="navigation-path">
        <h2 className="screen-reader-only">
          <Translate content="COMMON.YOU_ARE_HERE" />:
        </h2>
        <span>
          <a href="//www.ssb.no/">
            <Translate content="COMMON.FRONTPAGE" />
          </a>{" "}
          &gt;{" "}
        </span>
        <span>
          <a href="//www.ssb.no/metadata/">Metadata</a> &gt;{" "}
        </span>
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
          itemClass="step"
          excludes={["exclude"]}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderBreadcrumbs()}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
