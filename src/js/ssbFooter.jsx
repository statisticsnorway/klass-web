import React from "react";
import { TranslateComponent } from "./lib/languageUtils";

const SSBFooter = () => {
  return (
    <div id="footer" role="banner">
      <div className="sitewrapper">
        <ul className="global-links nav below">
          <li className="first">
            <TranslateComponent
              content="SSB_FRAME.HEADER.CONTACT_US"
              component="a"
              href="https://www.ssb.no/omssb/kontakt-oss"
            />
          </li>
          <li className="last">
            <TranslateComponent
              content="SSB_FRAME.FOOTER.COPYRIGHT"
              component="a"
              href="https://www.ssb.no/diverse/lisens"
            />
          </li>
        </ul>
        <ul className="social-links">
          <li>
            <a title="Twitter" href="https://twitter.com/ssbnytt">
              <img alt="Twitter" src="./images/twitter_ssb.png" />
            </a>
          </li>
          <li>
            <a title="RSS" href="https://www.ssb.no/diverse/rss">
              <img alt="RSS" src="./images/icon-rss-footer.png" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SSBFooter;
