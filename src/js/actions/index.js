import { CALL_API, Schemas } from '../middleware/api'
import * as types from '../constants/ActionTypes'

export function loadSubjects() {
	return {
		[CALL_API]: {
			// local: true,
			method: 'get',
			endpoint: '/classificationfamilies',
			types: [ types.SUBJECTS_REQUEST, types.SUBJECTS_SUCCESS, types.SUBJECTS_FAILURE ]
		}
	}
}

export function getClassification(id) {
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: `/classifications/${id}`,
			id: id,
			types: [ types.SELECTED_CLASS_REQUEST, types.SELECTED_CLASS_SUCCESS, types.SELECTED_CLASS_FAILURE ]
		}
	}
}

function fetchClassification(url, id) {
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: `${url}`,
			id: id,
			types: [ types.SUBJECTS_REQUEST, types.SUBJECTS_SUCCESS, types.SUBJECTS_FAILURE ]
		}
	}
}

function justToggleIt(id) {
	return {
		type: types.TOGGLE_SUBJECT,
		id: id
	}
}

export function toggleSubject(id) {
	return (dispatch, getState) => {
		const url = getState().classFamilies.items[id]._links.self.href
		const item = getState().classFamilies.items[id];
		if (item.classifications) {
			return dispatch(justToggleIt(id));
		}

		return dispatch(fetchClassification(url, id))
	}
}

export function toggleCode(code, kind) {
	return {
		type: kind == 'code' ? types.TOGGLE_CODE : types.TOGGLE_VARIANT,
		code: code
	}
}

export function loadVersion(id) {
	const url = '/versions/' + id
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: url,
			id: id,
			types: [ types.SELECTED_VERSION_REQUEST, types.SELECTED_VERSION_SUCCESS, types.SELECTED_VERSION_FAILURE ]
		}
	}
}

export function loadSSBSections(){
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: `/ssbsections`,
			types: [ types.SSB_SECTION_REQUEST, types.SSB_SECTION_SUCCESS, types.SSB_SECTION_FAILURE ]
		}
	}
}

export function searchClassification(query) {
	let params
	if (query) {
		params = Object.keys(query).map(function(key){
			return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
		}).join('&')
	}
	let url = "/classifications/search?" + params
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: url,
			params: query,
			types: [ types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE ]
		}
	}
}

export function setSearchObject(search) {
	return {
		type: types.SET_SEARCH_QUERY,
		search: search
	}
}

export function searchCode(query) {
	return {
		type: types.SEARCH_CODE,
		query: query
	}
}

export function loadChanges(classificationId, fromDate, toDate) {
	const to = toDate ? '&to=' + toDate : ''
	const url = '/classifications/' + classificationId + '/changes?from=' + fromDate + to

	return {
		[CALL_API]: {
			method: 'get',
			endpoint: url,
			headers: {
				'Accept': 'application/json'
			},
			types: [ types.CHANGES_REQUEST, types.CHANGES_SUCCESS, types.CHANGES_FAILURE ]
		}
	}
}

export function loadCorrespondence(itemId) {

	let url = "/correspondencetables/" + itemId
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: url,
			id: itemId,
			types: [ types.CORRESPONDENCE_REQUEST, types.CORRESPONDENCE_SUCCESS, types.CORRESPONDENCE_FAILURE ]
		}
	}
}

export function loadVariant(itemId) {

	let url = "/variants/" + itemId
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: url,
			id: itemId,
			types: [ types.VARIANT_REQUEST, types.VARIANT_SUCCESS, types.VARIANT_FAILURE ]
		}
	}
}
