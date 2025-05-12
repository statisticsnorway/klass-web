import React, {Component} from 'react'
import Breadcrumbs from 'react-breadcrumbs'
import {connect} from 'react-redux'
import Translate from 'react-translate-component'

class App extends Component {
	renderBreadcrumbs () {

        const classification = this.state

        console.log(this.props)
        const { routes, params } = this.props
        console.log(classification)
        console.log('Breadcrumbs Debug Info:')
        console.log('Routes:', this.props.routes)
        console.log('Params:', this.props.params)

        console.log(routes[0].path)
        console.log(params)
        return (
            <div id="breadcrumbs">
                <nav className="row path">
                    <h2 className="screen-reader-only"><Translate content="COMMON.YOU_ARE_HERE" />:</h2>
                    <div className="ssb-breadcrumbs">
                        <a href="https://www.ssb.no/" className="ssb-link">
                            <span className="link-text">Forsiden </span>
                        </a>
                    </div>
                    <div className="ssb-breadcrumbs">
                        <a href="https://www.ssb.no/metadata/" className="ssb-link">
                            <span className="link-text">Metadata</span>
                        </a>
                    </div>
                    <div className="step ssb-breadcrumbs">
                        <Breadcrumbs
                            routes={this.props.routes}
                            params={this.props.params}
                            itemClass="step"
                            excludes={['exclude']}
                        />
                    </div>
                </nav>
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
