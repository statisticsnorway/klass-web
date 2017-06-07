import { CALL_API } from '../middleware/api'
import * as types from '../constants/ActionTypes'

export function loadSubjects(params) {
    return {
        [CALL_API]: {
            frontpage: true,
            method: 'get',
            endpoint: '/classificationfamilies',
            headers: {
                    Accept: 'application/json'
           },
            params: params,
            types: [types.SUBJECTS_REQUEST, types.SUBJECTS_SUCCESS, types.SUBJECTS_FAILURE]
        }
    }
}

export function getClassification(id) {
    return {
        [CALL_API]: {
            method: 'get',
            endpoint: `/classifications/${id}`,
            id: id,
            types: [types.SELECTED_CLASS_REQUEST, types.SELECTED_CLASS_SUCCESS, types.SELECTED_CLASS_FAILURE]
        }
    }
}

function fetchClassification(url, id, params) {
    return {
        [CALL_API]: {
            frontpage: true,
            method: 'get',
            endpoint: `${url}`,
            params: params,
            id: id,
            types: [types.SUBJECTS_REQUEST, types.SUBJECTS_SUCCESS, types.SUBJECTS_FAILURE]
        }
    }
}

function justToggleIt(id, toggle) {
    return {
        type: types.TOGGLE_SUBJECT,
        id: id,
        show: toggle
    }
}

export function toggleSubject(id, params) {
    return fetchAndToggleSubject(id, undefined, params)
}

function fetchAndToggleSubject(id, toggle, params) {
    return (dispatch, getState) => {
        const url = getState().classFamilies.items[id]._links.self.href
        const item = getState().classFamilies.items[id]
        if (!item.children) {
            dispatch(fetchClassification(url, id, params))
        }
        dispatch(justToggleIt(id, toggle))
    }
}

export function toggleAllSubjects(toggle) {
    return (dispatch, getState) => {
        var promises = []
        var items = getState().classFamilies.items
        for (var idx in items) {
            const url = items[idx]._links.self.href
            const item = items[idx]
            if (item.numberOfClassifications > 0) {
                var promise = dispatch(fetchAndToggleSubject(idx, toggle))
                promises.push(promise)
            }
        }
        return Promise.all(promises)
    }
}

export function toggleAll(toggle, tab) {
    return {
        type: types.TOGGLE_ALL,
        tab: tab,
        show: toggle
    }
}

export function toggleCode(code, tab) {
    return {
        type: types.TOGGLE_CODE,
        tab: tab,
        code: code
    }
}

export function loadVersion(id, languageOverride) {
    const url = '/versions/' + id
    return {
        [CALL_API]: {
            method: 'get',
            endpoint: url,
            id: id,
            language: languageOverride,
            types: [types.SELECTED_VERSION_REQUEST, types.SELECTED_VERSION_SUCCESS, types.SELECTED_VERSION_FAILURE]
        }
    }
}

export function loadSSBSections() {
    return {
        [CALL_API]: {
            method: 'get',
            endpoint: `/ssbsections`,
            types: [types.SSB_SECTION_REQUEST, types.SSB_SECTION_SUCCESS, types.SSB_SECTION_FAILURE]
        }
    }
}

export function searchClassification(params) {
    let url = '/classifications/search'
    return {
        [CALL_API]: {
            method: 'get',
            endpoint: url,
            params: params,
            types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE]
        }
    }
}

export function setSearchObject(search) {
    return {
        type: types.SET_SEARCH_QUERY,
        search: search
    }
}

export function searchCode(query, tab) {
    return {
        type: types.SEARCH_CODE,
        tab : tab,
        query: query
    }
}

export function loadChanges(classificationId, params, languageOverride) {
    const url = '/classifications/' + classificationId + '/changes'

    return {
        [CALL_API]: {
            method: 'get',
            endpoint: url,
            params: params,
            language: languageOverride,
            headers: {
                'Accept': 'application/json'
            },
            types: [types.CHANGES_REQUEST, types.CHANGES_SUCCESS, types.CHANGES_FAILURE]
        }
    }
}

export function loadCorrespondence(itemId, languageOverride) {
    let url = '/correspondencetables/' + itemId
    return {
        [CALL_API]: {
            method: 'get',
            endpoint: url,
            id: itemId,
            language: languageOverride,
            types: [types.CORRESPONDENCE_REQUEST, types.CORRESPONDENCE_SUCCESS, types.CORRESPONDENCE_FAILURE]
        }
    }
}

export function loadVariant(itemId, languageOverride) {
    let url = '/variants/' + itemId
    return {
        [CALL_API]: {
            method: 'get',
            endpoint: url,
            id: itemId,
            language: languageOverride,
            types: [types.VARIANT_REQUEST, types.VARIANT_SUCCESS, types.VARIANT_FAILURE]
        }
    }
}

export function hideModal() {
    return toggleModal(false, null)
}

export function displayModal(item, contentType) {
    return toggleModal(true, item, contentType)
}

function toggleModal(bool, item, contentType) {
    return {
        type: types.TOGGLE_MODAL,
        display: bool,
        item: item,
        contentType: contentType
    }
}

export function subscribe(classId, email) {
    const params = {email: email}
    let url = '/classifications/' + classId + '/trackChanges'
    return {
        [CALL_API]: {
            method: 'post',
            endpoint: url,
            params: params,
            types: [types.SUBSCRIPTION_REQUEST, types.SUBSCRIPTION_SUCCESS, types.SUBSCRIPTION_FAILURE]
        }
    }
}
