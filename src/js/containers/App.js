import React, {Component} from 'react'
import { Link } from 'react-router'
// import Breadcrumbs from 'react-breadcrumbs'
import {connect} from 'react-redux'

class App extends Component {
	renderBreadcrumbs () {
		// return (
		// 	<div id="navigation-path">
		// 		<h2 className="screen-reader-only">Du er her:</h2>
		// 		<ul id="breadcrumbs" className="nav leftadjust">
		// 			<li><a href="/">Forsiden > </a></li>
		// 			<li>Klassifikasjoner og kodelister</li>
		// 		</ul>
		// 		<Breadcrumbs
		// 			routes={this.props.routes}
		// 			params={this.props.params}
		// 			setDocumentTitle={true}
		// 			excludes={['Klassifikasjoner']}
		// 			/>
		// 	</div>
		// )
		return (
			<div id="navigation-path">
				<h2 className="screen-reader-only">Du er her:</h2>
				<ul id="breadcrumbs" className="nav leftadjust">
					<li><Link to="/">Forsiden</Link> > </li>
					<li>Klassifikasjoner og kodelister</li>
				</ul>
			</div>
		)
	}
    render () {
        return (
            <div>
				{this.renderBreadcrumbs()}
				{this.props.children}
            </div>
        )
    }
}

function mapStateToProps () {
    return {}
}

export default connect(mapStateToProps)(App)
