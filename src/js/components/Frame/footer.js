import React from 'react'
import "./frame.scss";

export default function Footer(){
    return (
        <footer id="footerArchive" class="footerXP">
            <div class="ssb-footer-wrapper">
                <div id="footerContent" class="footer-bottom-row">
                    <div class="links-left">
                        <a href="/" title="Lenke til forsiden" style={{gridColumn: "1"}}>
                            <img src="./images/SSB_logo_white.svg" alt="SSB Logo" style={{height: "50px"}}/>
                        </a>
                    </div>
                    <div class="social-links">
                        <a href="/omssb/kontakt-oss" class="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Contact us") : document.write("Kontakt oss")
                            </script>
                            Kontakt oss
                        </a>
                        <a href="/diverse/tilgjengelighet" class="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Accessibility") : document.write("Tilgjengelighet")
                            </script>
                            Tilgjengelighet
                        </a>
                        <a href="/diverse/lisens" class="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("© Statistics Norway") : document.write("© Statistisk sentralbyrå")
                            </script>
                            © Statistisk sentralbyrå
                        </a>
                    </div>
                </div>
                <div class="footer-bottom-row showOnMobile">
                    <div class="showOnMobile links-left">
                        <a href="/" title="Lenke til forsiden" style={{gridColumn: "1"}}>
                            <img src="./images/SSB_logo_white.svg" alt="SSB Logo" style={{height: "35px"}}/>
                        </a>
                    </div>
                    <div class="showOnMobile social-links">
                        <a href="/omssb/kontakt-oss" class="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Contact us") : document.write("Kontakt oss")
                            </script>
                        </a>
                        <a href="/diverse/tilgjengelighet" class="ssb-link negative">
                            <script>
                                window.location.pathname.split("/")[1] === 'en' ? document.write("Accessibility") : document.write("Tilgjengelighet")
                            </script>
                        </a>
                        <a href="/diverse/lisens" class="ssb-link negative">
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
