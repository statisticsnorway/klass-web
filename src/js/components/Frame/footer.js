import React from 'react'
import "./frame.scss";


export default function Footer(){

    const lang = window.location.pathname.split('/')[1];
    const contactText = lang === 'en' ? "Contact us" : "Kontakt oss";
    const accessibilityText = lang === 'en' ? "Accessibility" : "Tilgjengelighet";
    const statisticsNorwayText = lang === 'en' ? "© Statistics Norway": "© Statistisk sentralbyrå";

    return (
        <footer id="footerArchive" className="footerXP">
            <div className="ssb-footer-wrapper">
                <div id="footerContent" class="footer-bottom-row">
                    <div className="links-left">
                        <a href="/" title="Lenke til forsiden">
                            <img id="footer-logo" src="./images/SSB_logo_white.svg" alt="SSB Logo"/>
                        </a>
                    </div>
                    <div className="social-links">
                        <a href="/omssb/kontakt-oss" className="ssb-link negative">
                            {contactText}
                        </a>
                        <a href="/diverse/tilgjengelighet" className="ssb-link negative">
                            {accessibilityText}
                        </a>
                        <a href="/diverse/lisens" className="ssb-link negative">
                            {statisticsNorwayText}
                        </a>
                    </div>
                </div>
                <div className="footer-bottom-row showOnMobile">
                    <div className="showOnMobile links-left">
                        <a href="/" title="Lenke til forsiden">
                            <img src="./images/SSB_logo_white.svg" alt="SSB Logo" className="ssb-logo-mobile"/>
                        </a>
                    </div>
                    <div className="showOnMobile social-links">
                        <a href="/omssb/kontakt-oss" className="ssb-link negative">
                            {contactText}
                        </a>
                        <a href="/diverse/tilgjengelighet" className="ssb-link negative">
                            {accessibilityText}
                        </a>
                        <a href="/diverse/lisens" className="ssb-link negative">
                            {statisticsNorwayText}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
