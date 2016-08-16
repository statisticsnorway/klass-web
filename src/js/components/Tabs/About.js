import React, { Component, PropTypes } from 'react'
import Translate from 'react-translate-component'
import counterpart from 'counterpart'
import _ from 'lodash'
import moment from 'moment'

class About extends Component {
	renderLevels (levels) {
		return levels.map(function(level, key){
			return (
				<tr key={key}>
					<td className="align-right">{level.levelNumber}</td>
					<td>{level.levelName}</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			)
		})
	}

	render () {
		const { version, actions } = this.props

        let publications
        if (version.publications) {
            publications = <a href={version.publications}>{version.publications}</a>
        } else {
            publications = counterpart.translate('TABS.ABOUT.NOT_RELEVANT')
        }

		return (
			<div>
				<h3>Om {version.name}</h3>
				<table className="about-table">
					<tbody>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.DESCRIPTION" />:</td>
							<td>{version.introduction}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.OWNER" />:</td>
							<td>{version.contactPerson.name}, <Translate content="TABS.ABOUT.SECTION_FOR" /> {_.lowerFirst(version.owningSection)}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.VALID_FROM" />:</td>
							<td>{moment(version.validFrom).format("D MMMM YYYY")}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.PUBLISHED" />:</td>
							<td>{version.published.join()}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.DERIVEDFROM" />:</td>
							<td>{version.derivedFrom ? version.derivedFrom : counterpart.translate('TABS.ABOUT.NOT_RELEVANT')}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.LEGALBASE" />:</td>
							<td>{version.legalBase ? version.legalBase : counterpart.translate('TABS.ABOUT.NOT_RELEVANT')}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.PUBLICATIONS" />:</td>
							<td>{publications}</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.LEVELS" />:</td>
							<td>
								<table className="levels-table alternate">
									<thead>
										<tr>
											<Translate component="th" content="TABS.ABOUT.NUMBER" className="align-right" />
											<Translate component="th" content="COMMON.NAME" />
											<Translate component="th" content="TABS.ABOUT.DESCRIPTION" />
											<Translate component="th" content="TABS.ABOUT.STRUCTURE" />
											<Translate component="th" content="TABS.ABOUT.NUMBER_OF_UNITS" />
										</tr>
									</thead>
									<tbody>
										{this.renderLevels(version.levels)}
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td className="label"><Translate content="TABS.ABOUT.CHANGELOG" />:</td>
							<td>
								<table className="levels-table alternate">
									<thead>
										<tr>
											<Translate component="th" content="COMMON.DATE" />
											<Translate component="th" content="COMMON.TIME" />
											<Translate component="th" content="COMMON.COMMENTS" />
										</tr>
									</thead>
									<tbody>
										{this.renderChangeLog()}
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

    renderChangeLog () {
        const { version } = this.props

        if (_.isEmpty(version.changelogs)){
            return (
                <tr>
                    <td colSpan="3">Ingen endringer</td>
                </tr>
            )
        }

        return this.changeLogBody(version.changelogs)
    }

    changeLogBody (items) {

        return items.map(function(change, key) {
            return (
                <tr key={key}>
                    <td>{moment(change.changeOccured).format("DD.MMMM YYYY")}</td>
                    <td>{moment(change.changeOccured).format("H:m:s")}</td>
                    <td>{change.description}</td>
                </tr>
            )
        })

    }
}

About.propTypes = {
	actions: PropTypes.object.isRequired,
	version: PropTypes.object.isRequired
}

export default About
