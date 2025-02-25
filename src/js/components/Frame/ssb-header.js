import React, { Component } from 'react'
import "./header.scss";
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
                <span className="screen-reader-only"><Translate content="SSB_FRAME.HEADER.CHOOSE_LETTER_SIZE" /></span>
                <ul>
                    <li>
                        <a title="Normal" href="#normal" className="size-default" onClick={(ev) => this.setTextSize(ev)}>A <span className="screen-reader-only"><Translate content="SSB_FRAME.HEADER.LETTER_REGULAR" /></span></a>
                    </li>
                    <li>
                        <a title="Stor tekst" href="#stor-tekst" className="size-l" onClick={(ev) => this.setTextSize(ev, 'large')}>A <span className="screen-reader-only"><Translate content="SSB_FRAME.HEADER.LETTER_LARGER" /></span></a>
                    </li>
                    <li>
                        <a title="Ekstra stor tekst" href="#ekstra-stor-tekst" className="size-xl" onClick={(ev) => this.setTextSize(ev, 'extra-large')}>A<span className="screen-reader-only"><Translate content="SSB_FRAME.HEADER.LETTER_LARGEST" /></span></a>
                    </li>
                </ul>
            </li>
        )
    }
    toggleLanguage (e) {
        e.preventDefault();
        const lang = e.currentTarget.lang;




        // regex to make sure current url does not contain "en/" in its url and groups for easy insert of "en/"
        // ex(http(s)://www.ssb.no/)(klass/)(#!/)(klassifikasjoner/7)
        const NORWEGIAN_URL_REGEX = /(http(s?):\/\/.*?\/)(?!en\/)([^#!\/]*\/)?(#!\/)?(.*)/;

        // regex to make sure current url is an english one (contains "en/") and groups for easy removal of "en/"
        // ex(http(s)://www.ssb.no/)(en/)(#!/)(klassifikasjoner/7)
        let ENGLISH_URL_REGEX = /(http(s?):\/\/.*?)(en\/)(#!\/)?(.*)/;

        if (document.URL.match(ENGLISH_URL_REGEX) ) {
            //remove (en/) group and navigate to new url
            let location = document.URL.replace(ENGLISH_URL_REGEX, "$1$4$5");
            window.location = location
        }else if (document.URL.match(NORWEGIAN_URL_REGEX) ){
            // insert "en/" in url
            let location = document.URL.replace(NORWEGIAN_URL_REGEX, "$1en/$3$5");
            window.location = location
        } else {
            console.error("no regex url match")
            sessionStorage.clear('selectedAPILanguage')
            sessionStorage.setItem('selectedLanguage', lang)
            window.location.reload()
        }
    }

    renderMainMenu() {
        return (
            <div id="main-menu" role="navigation">
                <ul id="main-menu-top" className={'nav '+counterpart.translate('LANGUAGE.CHOSEN_LANG_SHORT')} role="menu">
                    <li className="top-level statistikk" role="menuitem">
                        <a id="statistics-menu-toggle" href="https://www.ssb.no/"><Translate content="SSB_FRAME.HEADER.STATISTICS" /></a>
                    </li>
                    <li className="top-level forskning" role="menuitem">
                        <a id="forskning-menu-toggle" href="https://www.ssb.no/forskning"><Translate content="SSB_FRAME.HEADER.RESEARCH" /></a>
                    </li>
                    <li className="top-level innrapportering" role="menuitem">
                        <a href="https://www.ssb.no/innrapportering" title="Innrapportering"><Translate content="SSB_FRAME.HEADER.DATA_COLLECTION" /></a>
                    </li>
                    <li className="top-level omssb" role="menuitem">
                        <a id="omssb-menu-toggle" href="https://www.ssb.no/omssb/ssbs-virksomhet"><Translate content="SSB_FRAME.HEADER.ABOUT_SSB" /></a>
                    </li>
                </ul>
            </div>
        )
    }

    toggleMenu (e) {
        if (document.body.className.indexOf('menu_open') > -1) {
            document.body.classList.remove('menu_open')
        } else {
            document.body.classList.add('menu_open')
        }
    }

    toggleSearch (e) {
        if (document.body.className.indexOf('search_open') > -1) {
            document.body.classList.remove('search_open')
        } else {
            document.body.classList.add('search_open')
        }
    }

	render () {
        return (
            <div id="header" className="menu-closed">
                <span className="menuBtn" onClick={(ev) => this.toggleMenu()} />
                <span className="searchBtn" onClick={(ev) => this.toggleSearch()} />
                <div className="sitewrapper">
                    <a id="logo" href="https://www.ssb.no/" title="Gå til forsiden">
                        <img src="./images/ssb-logo-black.svg" alt="SSB logo (Gå til forsiden)" />
                    </a>
                    <div id="global-tools">
                        <ul className="global-links nav">
                            {this.renderLetterSize()}
                            <li id="global-language" className="bubble-dialog-origin" lang={counterpart.translate('LANGUAGE.TOGGLE_SHORT')}>
                                <span className="screen-reader-only" lang={counterpart.translate('LANGUAGE.TOGGLE_SHORT')}><Translate content="LANGUAGE.SWITCH_LANGUAGE" /></span>
                                <a id="change-language" lang={counterpart.translate('LANGUAGE.TOGGLE_SHORT')} href={'#'+counterpart.translate('LANGUAGE.TOGGLE_SHORT')} onClick={(ev) => this.toggleLanguage(ev)}><Translate content="LANGUAGE.TOGGLE" /></a>
                            </li>
                            <li id="global-cookies" className="shortcut keywords">
                                <Translate content="SSB_FRAME.HEADER.COOKIES" component="a" id="cookies" href="https://www.ssb.no/diverse/cookies-og-analyseverktoy-for-webstatistikk" />
                            </li>
                            <li id="global-contact" className="shortcut last"><a href="https://www.ssb.no/omssb/kontakt-oss" accessKey="7"><Translate content="SSB_FRAME.HEADER.CONTACT_US" /></a></li>
                        </ul>
                    </div>
                    <form id="search" action="https://www.ssb.no/en/sok" method="get" role="search">
                        <fieldset>
                            <legend className="screen-reader-only"><Translate content="SSB_FRAME.HEADER.SITE_SEARCH" /></legend>
                            <label htmlFor="sok" className="screen-reader-only">ø
                                <Translate content="SEARCH.SEARCH" />
                            </label>
                            <input id="sok" name="sok" type="text" accessKey="4" tabIndex="-1" />
                            <input type="submit" value={counterpart.translate('SEARCH.SEARCH')} className="submit" tabIndex="-1" />
                        </fieldset>
                    </form>
                    {this.renderMainMenu()}
                </div>
            </div>
        )
	}
}

export default SSBHeader
