import React, { Component } from 'react'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'

class SSBHeader extends Component {
    setTextSize (ev, size) {
        ev.preventDefault()
        document.body.className = size
    }
    renderLetterSize () {
        return (
            <li id="letter-size" className="first">
                <span className="screen-reader-only">Velg tekststørrelse</span>
                <ul>
                    <li>
                        <a title="Normal" href="#normal" className="size-default" onClick={(ev) => this.setTextSize(ev)}>A <span className="screen-reader-only">Vanlig</span></a>
                    </li>
                    <li>
                        <a title="Stor tekst" href="#stor-tekst" className="size-l" onClick={(ev) => this.setTextSize(ev, 'large')}>A <span className="screen-reader-only">Større</span></a>
                    </li>
                    <li>
                        <a title="Ekstra stor tekst" href="#ekstra-stor-tekst" className="size-xl" onClick={(ev) => this.setTextSize(ev, 'extra-large')}>A<span className="screen-reader-only">Størst</span></a>
                    </li>
                </ul>
            </li>
        )
    }
    toggleLanguage (e) {
        e.preventDefault();
        const lang = e.currentTarget.lang.toUpperCase()

    	// counterpart.setLocale(lang);
        sessionStorage.setItem('selectedOuterLanguage', lang)
        // this.forceUpdate()
        window.location.reload()
    }
	render () {
        return (
            <div id="header" className="menu-closed">
                <div className="sitewrapper">
                    <a id="logo" href="http://www.ssb.no/" title="Gå til forsiden">
                        <img src="../images/SSB_logo.png" alt="SSB logo (Gå til forsiden)" />
                    </a>
                    <div id="global-tools">
                        <ul className="global-links nav">
                            {this.renderLetterSize()}
                            <li id="global-language" className="bubble-dialog-origin" lang={counterpart.translate('LANGUAGE.TOGGLE_SHORT')}>
                                <span className="screen-reader-only" lang={counterpart.translate('LANGUAGE.TOGGLE_SHORT')}><Translate content="LANGUAGE.SWITCH_LANGUAGE" /></span>
                                <a id="change-language" lang={counterpart.translate('LANGUAGE.TOGGLE_SHORT')} href={'#'+counterpart.translate('LANGUAGE.TOGGLE_SHORT')} onClick={(ev) => this.toggleLanguage(ev)}><Translate content="LANGUAGE.TOGGLE" /></a>
                            </li>
                            <li id="global-cookies" className="shortcut keywords"><a id="cookies" href="http://www.ssb.no/omssb/personvern/">Cookies og personvern</a></li>
                            <li className="shortcut keywords"><a href="http://www.ssb.no/a-aa" title="Stikkord A-Å">Stikkord A-Å</a></li>
                            <li id="global-contact" className="shortcut last"><a href="http://www.ssb.no/omssb/kontakt-oss" accesskey="7">Kontakt oss</a></li>
                        </ul>
                    </div>
                    <form id="search" action="http://www.ssb.no/en/sok" method="get" role="search">
                       <fieldset>
                          <legend className="screen-reader-only">Site search</legend>
                          <label for="sok" className="screen-reader-only">Search</label>
                          <input id="sok" name="sok" type="text" accesskey="4" tabindex="5" />
                          <input type="submit" value="Search" className="submit" tabindex="6" />
                      </fieldset>
                    </form>
                    {this.renderMainMenu()}
                </div>
            </div>
        )
	}

    renderMainMenu() {
        return (
            <div id="main-menu" role="navigation">
                <ul id="main-menu-top" className={'nav '+counterpart.translate('LANGUAGE.CHOSEN_LANG_SHORT')} role="menu">
                    <li className="top-level statistikk" role="menuitem">
                        <a id="statistics-menu-toggle" href="http://www.ssb.no/"><Translate content="MENU.STATISTICS" /></a>
                    </li>
                    <li className="top-level forskning" role="menuitem">
                        <a id="forskning-menu-toggle" href="http://www.ssb.no/forskning"><Translate content="MENU.RESEARCH" /></a>
                    </li>
                    <li className="top-level innrapportering" role="menuitem">
                        <a href="http://www.ssb.no/innrapportering" title="Innrapportering"><Translate content="MENU.DATA_COLLECTION" /></a>
                    </li>
                    <li className="top-level omssb" role="menuitem">
                        <a id="omssb-menu-toggle" href="http://www.ssb.no/omssb"><Translate content="MENU.ABOUT_SSB" /></a>
                    </li>
                    <li className="top-level mittssb" role="menuitem">
                        <a href="http://www.ssb.no/mittssb/profil" title="Mitt SSB "><Translate content="MENU.MY_PAGE" /> </a>
                    </li>
                </ul>
            </div>
        )
    }
}


class SSBFooter extends Component {
	render () {
        return (
            <div id="footer" role="banner">
                <div className="sitewrapper">
                    <ul className="global-links nav below">
                       <li className="first"><a href="http://www.ssb.no/omssb/kontakt-oss">Kontakt oss</a></li>
                       <li><a href="http://www.ssb.no/mittssb/epost/?lang=no">Nyhetsbrev </a></li>
                       <li><a href="http://www.ssb.no/nettstedskart" accesskey="3">Nettstedskart</a></li>
                       <li className="last"><a href="http://www.ssb.no/informasjon/copyright">2016 © Statistisk sentralbyrå</a></li>
                    </ul>
                    <ul className="social-links">
                       <li><a title="Twitter" href="https://twitter.com/ssbnytt"><img alt="Twitter" src="../images/twitter_ssb.png" /></a></li>
                       <li><a title="RSS" href="http://www.ssb.no/informasjon/rss"><img alt="RSS" src="../images/icon-rss-footer.png" /></a></li>
                    </ul>
                </div>
            </div>
        )
	}
}

export {SSBHeader, SSBFooter}
