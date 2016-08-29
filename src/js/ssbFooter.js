import React, { Component } from 'react'
import Translate from 'react-translate-component'

class SSBFooter extends Component {
	render () {
        return (
            <div id="footer" role="banner">
                <div className="sitewrapper">
                    <ul className="global-links nav below">
                       <li className="first">
                           <Translate content="SSB_FRAME.HEADER.CONTACT_US" component="a" href="http://www.ssb.no/omssb/kontakt-oss" />
                       </li>
                       <li>
                           <Translate content="SSB_FRAME.FOOTER.NEWSLETTER" component="a" href="http://www.ssb.no/mittssb/epost/?lang=no" />
                       </li>
                       <li>
                           <Translate content="SSB_FRAME.FOOTER.SITEMAP" component="a" href="http://www.ssb.no/nettstedskart" accesskey="3" />
                       </li>
                       <li className="last">
                           <Translate content="SSB_FRAME.FOOTER.COPYRIGHT" component="a" href="http://www.ssb.no/informasjon/copyright" />
                       </li>
                    </ul>
                    <ul className="social-links">
                       <li><a title="Twitter" href="https://twitter.com/ssbnytt"><img alt="Twitter" src="./images/twitter_ssb.png" /></a></li>
                       <li><a title="RSS" href="http://www.ssb.no/informasjon/rss"><img alt="RSS" src="./images/icon-rss-footer.png" /></a></li>
                    </ul>
                </div>
            </div>
        )
	}
}

export default SSBFooter
