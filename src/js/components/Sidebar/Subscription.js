import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import Translate from "react-translate-component";
import counterpart from "counterpart";

class Subscription extends Component {

    constructor() {
        super()
        this.state = {
            subscribed: false
        }
    }


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
            ReactDOM.findDOMNode(this.refs.invalidEmail).style.display = 'none'
            ReactDOM.findDOMNode(this.refs.subscriptionError).style.display = 'none'
    }

    getErrorMessageTranslation() {
        switch (this.props.errorCode) {
            case "STATUS_EXISTS":
                return "SUBSCRIPTION.EXISTS_ERROR";
            default:
                return "SUBSCRIPTION.GENERAL_ERROR";
        }
    }

    renderSubscription() {
        const {subscription} = this.props
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
                    type="text" ref="subscriptionEmail" name="suscriptionEmail"/>
                <Translate component="p" content="SUBSCRIPTION.EMAIL_ERROR" ref="invalidEmail" className="error"/>
                <p ref="subscriptionError" className="error">{counterpart.translate(this.getErrorMessageTranslation())}</p>

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
    subscription: state.subscription,
    errorMsg: state.subscription.errorMsg,
    errorCode: state.subscription.errorCode
})

export default connect(
	mapStateToProps
)(Subscription)
