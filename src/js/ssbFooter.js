import React, { Component } from 'react'
import Translate from 'react-translate-component'

class SSBFooter extends Component {
	render () {
        return (
            <div id="footer" role="banner">
                <div className="sitewrapper">
                    <ul className="global-links nav below">
                        <li className="first">
                            <Translate content="SSB_FRAME.HEADER.CONTACT_US" component="a" href="https://www.ssb.no/omssb/kontakt-oss" />
                        </li>
                        <li className="last">
                            <Translate content="SSB_FRAME.FOOTER.COPYRIGHT" component="a" href="https://www.ssb.no/diverse/lisens" />
                        </li>
                    </ul>
                    <ul className="social-links">
                        <li><a title="RSS" href="https://www.ssb.no/diverse/rss"><img alt="RSS" src="./images/icon-rss-footer.png" /></a></li>
                    </ul>
                </div>
            </div>
        )
	}
}

export default SSBFooter
