import {clientType} from '../types'

export const onChangeDate = (typeVal) => {
    return {
        type: clientType.CHANGE_DATE_EVENT,
        payload: typeVal
    }
};

export const onGotoToday = () => {
    return {
        type: clientType.GOTO_TODAY_EVENT
    }
};

export const onFetchedEventList = (payload) => {
    return {
        type: clientType.FETCHED_EVENT_LIST,
        payload
    }
};

export const onSaveToLocal = (payload) => {
    return {
        type: clientType.SAVE_TO_LOCAL,
        payload
    }
};

export const onSetButtonDisable = (payload = true) => {
    return {
        type: clientType.SET_BUTTON_DISABLE,
        payload
    }
};

export const onShowControlModal = (payload = null, type = 'add') => {
    return {
        type: clientType.SHOW_CONTROL_MODAL,
        payload: {
            title: type === 'add' ? '' : payload.title,
            startTime: type === 'add' ? '' : payload.startTime,
            endTime: type === 'add' ? '' : payload.endTime,
            id: type === 'add' ? '' : payload.id,
            type
        }
    }
};

export const onShowEventListModal = (eventList = []) => {
    return {
        type: clientType.SHOW_EVENTLIST_MODAL,
        payload: eventList
    }
};

export const onHideControlModal = () => {
    return {
        type: clientType.HIDE_CONTROL_MODAL
    }
};

export const onHideEventListModal = () => {
    return {
        type: clientType.HIDE_EVENTLIST_MODAL
    }
};

export const onSaveEventSuccess = (payload, successType = 'add') => {
    console.log(payload);
    return {
        type: clientType.SAVE_EVENT_SUCCESS,
        payload: {
            data: payload,
            successType: successType
        }
    }
};
export const onDeleteEventSuccess = (id) => {
    return {
        type: clientType.DELETE_EVENT_SUCCESS,
        payload: id
    }
};



