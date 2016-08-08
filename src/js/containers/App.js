import React, {Component} from 'react'
import { Link } from 'react-router'
import Breadcrumbs from 'react-breadcrumbs'
import {connect} from 'react-redux'

class App extends Component {
	renderBreadcrumbs () {

        return (
            <div id="navigation-path">
                <h2 className="screen-reader-only">Du er her:</h2>
                <span><a href="http://www.ssb.no/">Forsiden</a> > </span>
                <Breadcrumbs
                    routes={this.props.routes}
                    params={this.props.params}
                    itemClass="step"
                    excludes={['exclude']}
                    />
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
