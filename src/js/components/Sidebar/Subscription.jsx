import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { translate, TranslateComponent } from "../../lib/languageUtils";

const Subscription = ({ actions, params, errorCode }) => {
  const [subscribed, setSubscribed] = useState(false);
  const subscriptionEmailRef = useRef(null);
  const invalidEmailRef = useRef(null);
  const subscriptionErrorRef = useRef(null);

  const isInvalidEmail = (email) => {
    return !/^.+@.+\..+$/.test(email);
  };

  const subscribe = () => {
    const email = subscriptionEmailRef.current.value.trim();

    if (isInvalidEmail(email)) {
      invalidEmailRef.current.style.display = "block";
    } else {
      actions.subscribe(params.classId, email).then((res) => {
        if (res.error) {
          invalidEmailRef.current.style.display = "none";
          subscriptionErrorRef.current.style.display = "block";
        } else {
          setSubscribed(true);
        }
      });
    }
  };

  const handleChange = () => {
    invalidEmailRef.current.style.display = "none";
    subscriptionErrorRef.current.style.display = "none";
  };

  const getErrorMessageTranslation = () => {
    switch (errorCode) {
      case "STATUS_EXISTS":
        return "SUBSCRIPTION.EXISTS_ERROR";
      default:
        return "SUBSCRIPTION.GENERAL_ERROR";
    }
  };

  const renderSubscription = () => {
    if (subscribed) {
      return (
        <div className="side-content-wrapper">
          <TranslateComponent content="SUBSCRIPTION.SUBSCRIBED" component="p" />
        </div>
      );
    }

    return (
      <div className="side-content-wrapper">
        <TranslateComponent content="SUBSCRIPTION.DESCRIPTION" component="p" />
        <TranslateComponent
          component="input"
          aria-label={translate("CONTACT.EMAIL")}
          attributes={{ placeholder: "CONTACT.EMAIL" }}
          className="subscriptionEmail"
          onChange={handleChange}
          type="text"
          ref={subscriptionEmailRef}
          name="subscriptionEmail"
        />
        <TranslateComponent
          component="p"
          content="SUBSCRIPTION.EMAIL_ERROR"
          ref={invalidEmailRef}
          className="error"
          style={{ display: "none" }}
        />
        <p
          ref={subscriptionErrorRef}
          className="error"
          style={{ display: "none" }}
        >
          {translate(getErrorMessageTranslation())}
        </p>

        <button onClick={subscribe}>
          <TranslateComponent content="SUBSCRIPTION.SUBSCRIBE" />
        </button>
      </div>
    );
  };

  return (
    <div id="subscription">
      <h2>
        <span className="icon-subscription">
          <TranslateComponent content="SUBSCRIPTION.HEADER" />
        </span>
      </h2>
      {renderSubscription()}
    </div>
  );
};

Subscription.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  errorCode: PropTypes.string,
};

export default Subscription;
