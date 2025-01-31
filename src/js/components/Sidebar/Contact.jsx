import PropTypes from "prop-types";
import React from "react";
import { TranslateComponent } from "../../lib/languageUtils";

const defaultContactInfo = {
  name: "Anne Gro Hustoft",
  email: "anne.gro.hustoft@ssb.no",
  phone: "40 90 25 52",
};

const Contact = ({ contactInfo }) => {
  const info = contactInfo && Object.keys(contactInfo).length > 0 ? contactInfo : defaultContactInfo;

  return (
    <div id="contacts">
      <h2>
        <span className="icon-contact">
          <TranslateComponent content="CONTACT.HEADER" />
        </span>
      </h2>
      <div className="side-content-wrapper">
        <p className="name">{info.name}</p>
        <p className="e-mail">
          <span className="key">
            <TranslateComponent content="CONTACT.EMAIL" />:{" "}
          </span>
          <a className="value" href={`mailto:${info.email}`}>
            {info.email}
          </a>
        </p>
        <p className="phone">
          <span className="key">
            <TranslateComponent content="CONTACT.PHONE" />:{" "}
          </span>
          <span className="value">{info.phone}</span>
        </p>
      </div>
    </div>
  );
};

Contact.propTypes = {
  contactInfo: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default Contact;
