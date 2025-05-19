import React from 'react'
import "./frame.scss";

export default function Footer(){
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
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Contact us") : document.write("Kontakt oss")
                            </script>
                        </a>
                        <a href="/diverse/tilgjengelighet" className="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Accessibility") : document.write("Tilgjengelighet")
                            </script>
                        </a>
                        <a href="/diverse/lisens" className="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("© Statistics Norway") : document.write("© Statistisk sentralbyrå")
                            </script>
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
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Contact us") : document.write("Kontakt oss")
                            </script>
                        </a>
                        <a href="/diverse/tilgjengelighet" className="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Accessibility") : document.write("Tilgjengelighet")
                            </script>
                        </a>
                        <a href="/diverse/lisens" className="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("© Statistics Norway") : document.write("© Statistisk sentralbyrå")
                            </script>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
