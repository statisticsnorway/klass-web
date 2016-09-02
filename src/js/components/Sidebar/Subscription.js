import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import {connect} from 'react-redux'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'

class Subscription extends Component {

    constructor() {
        super()
        this.state = {
            subscribed: false
        }
    }

	// componentWillReceiveProps (nextProps) {
	// 	const { subscription } = this.props
    //     if (!nextProps.subscription.isFetching && !_.isEqual(subscription, nextProps.subscription) && !_.isEmpty(nextProps.subscription.errorMsg)) {
    //         ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'none'
    //         ReactDOM.findDOMNode(this.refs.subscriptionError).style.display = 'block'
    //     }
	// }

    isInvalidEmail (email) {
        if (!/^.+@.+\..+$/.test(email)) {
            return true
        }
        return false
    }

    subscribe () {
        const { actions, params } = this.props
		const email = ReactDOM.findDOMNode(this.refs.subscriptionEmail).value.trim()

        if (this.isInvalidEmail(email)) {
            ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'block'
        } else {
            actions.subscribe(params.classId, email).then(function(res) {
                if (res.error) {
                    ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'none'
                    ReactDOM.findDOMNode(this.refs.subscriptionError).style.display = 'block'
                } else {
                    this.setState({
                        subscribed: true
                    })
                }
            }.bind(this))
        }
    }

    handleChange (event) {
        const email = ReactDOM.findDOMNode(this.refs.subscriptionEmail).value.trim()
        ReactDOM.findDOMNode(this.refs.subscriptionError).style.display = 'none'
        if (_.isEmpty(email)) {
            ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'none'
        }
        else if (this.isInvalidEmail(email)) {
            ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'block'
        } else {
            ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'none'
        }
    }

    renderSubscription () {
        const { subscription } = this.props
        if (this.state.subscribed) {
            return (
                <div className="side-content-wrapper">
                    <Translate content="SUBSCRIPTION.SUBSCRIBED" component="p" />
                </div>
            )
        }

        return (
            <div className="side-content-wrapper">
                <Translate content="SUBSCRIPTION.DESCRIPTION" component="p" />
                <Translate
                    component="input"
                    aria-label={counterpart.translate('CONTACT.EMAIL')}
                    attributes={{ placeholder: 'CONTACT.EMAIL' }}
                    className="subscriptionEmail"
                    onChange={this.handleChange.bind(this)}
                    type="text" ref="subscriptionEmail" name="suscriptionEmail" />
                <Translate component="p" content="SUBSCRIPTION.EMAIL_ERROR" ref="invalidEmail" className="error" />
                <Translate component="p" content="SUBSCRIPTION.GENERAL_ERROR" ref="subscriptionError" className="error" />

                <button ref="subscribeBtn" value="true" onClick={(ev) => this.subscribe(ev)}>
                    <Translate content="SUBSCRIPTION.SUBSCRIBE"/>
                </button>
            </div>
        )
    }

	render() {
        return (
            <div id="subscription">
                <h2>
                    <span className="icon-subscription">
                        <Translate content="SUBSCRIPTION.HEADER" />
                    </span>
                </h2>
                {this.renderSubscription()}
            </div>
        )
	}
}

Subscription.propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
	subscription: state.subscription
})

export default connect(
	mapStateToProps
)(Subscription)
