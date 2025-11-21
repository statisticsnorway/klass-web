import React, { Component } from "react";
import { connect } from "react-redux";
import Translate from "react-translate-component";

class App extends Component {
	renderBreadcrumbs() {
		const { selectedClass } = this.props;
		return (
			<div id="navigation-path">
				<h2 className="screen-reader-only">
					<Translate content="COMMON.YOU_ARE_HERE" />:
				</h2>
				<span>
					<a href="//www.ssb.no/">
						<Translate content="COMMON.FRONTPAGE" />
					</a>
					{" > "}
				</span>
				<span>
					<a href="//www.ssb.no/metadata/">Metadata</a>
					{" > "}
				</span>
				<span>
					<a href="/klass">Klassifikasjoner og kodelister (Klass)</a>
					{selectedClass?.name ? " > " : ""}
				</span>
				{selectedClass?.name ? (
					<span className="step">{selectedClass.name}</span>
				) : null}
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

function mapStateToProps(state) {
	return {
		selectedClass: state.selectedClass.classification,
	};
}

export default connect(mapStateToProps)(App);
