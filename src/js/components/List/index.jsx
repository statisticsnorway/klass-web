import "./List.scss";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import ReduxListItem from "./items/ReduxListItem";
import CodeListItem from "./items/CodeListItem";
import counterpart from "counterpart";


class List extends Component {

	renderList() {
		const { items, type, actions, modal, translations } = this.props
		if (items) {
			return items.map(function(item, key){
				let name
				switch (type) {
                    case 'code':
                        name = <span className="itemName">
							<b>{item.code}</b> - <span className="longName">{item.name}</span>
							<span className="shortName" aria-hidden="true">{item.shortName}</span>
						</span>
                        return (
							<CodeListItem
								key={type + key}
								idx={key}
								item={item}
								displayName={name}
								type={type}
								actions={actions}
								modal={modal}
								translations={translations}/>
                        )
					case 'variant':
						name = <span className="itemName"><b>{item.code}</b> - <span className="longName">{item.name}</span></span>
                        return (
							<CodeListItem
								key={type + key}
								idx={key}
								item={item}
								displayName={name}
								type={type}
								actions={actions}
								modal={modal}
								translations={translations}/>
						)
					case 'classFamilies':
						name = <span>{item.name} ({item.numberOfClassifications})</span>
						break;
					default:
						name = <span>{item.name}</span>
				}

                if (item.numberOfClassifications || item.code) {
                    return (
						<ReduxListItem
							key={type + key}
							idx={key}
							item={item}
							displayName={name}
							type={type}
							actions={actions}
							modal={modal}/>
                    )
                }
			})
		}
	}

	render() {
		const {items, loadingLabel, isFetching} = this.props
		const isEmpty = items.length === 0

		if (isEmpty && isFetching) {
			return (
				<p>
					<i>{loadingLabel}</i>
				</p>
			)
		}

        // return (
        //     <div role="tree">
        //         {this.renderList()}
        //     </div>
        // )

		return (
			<ol className="expandcollapse" role="tree">
				{this.renderList()}
			</ol>
		)
	}
}

List.propTypes = {
	modal: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	items: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	translations: PropTypes.object
}

List.defaultProps = {
	items: [],
	isFetching: true,
	loadingLabel: counterpart.translate('LOADING.CLASSIFICATIONS_AND_CODELISTS')
}

export default List
