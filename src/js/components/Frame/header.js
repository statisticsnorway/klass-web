import React from 'react'
import "./frame.scss";

export default function Header(){
    return (
        <div class="header-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <header id="headerArchive" class="header-content">
                            <div class="topRow">
                                <a href="/" class="logo" title="Lenke til forsiden">
                                    <img src="./images/SSB_logo_black.svg" alt="SSB Logo"/>
                                </a>
                                <form class="topSearch" action="/sok" method="get">
                                    <input id="searchbox" type="text" name="sok" placeholder="" />
                                    <script>
                                        document.getElementById("searchbox").placeholder = window.location.pathname.split("/")[1] === 'en' ? "Search in all of ssb.no" : "Søk i hele ssb.no"
                                    </script>
                                    <div class="searchBoxIcon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                    </div>
                                </form>
                                <div class="cookies">
                                    <a href="/diverse/cookies-og-analyseverktoy-for-webstatistikk">
                                        <script>
                                            window.location.pathname.split("/")[1] === 'en' ? document.write("We use cookies") : document.write("Vi bruker cookies")
                                        </script>
                                        Vi bruker cookies
                                    </a>
                                </div>
                            </div>
                            <hr />            
                        </header>
                    </div>
                </div>
            </div>
        </div>
    )
}