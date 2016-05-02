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

export function toggleCode(code) {
	return {
		type: types.TOGGLE_CODE,
		code: code
	}
}

export function loadVersion(url) {
	return {
		[CALL_API]: {
			method: 'get',
			endpoint: `${url}`,
			types: [ types.SELECTED_CLASS_REQUEST, types.SELECTED_CLASS_SUCCESS, types.SELECTED_CLASS_FAILURE ]
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
