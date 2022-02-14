import moment from "moment-timezone";
import {clientType} from "../types";
import {
    addNewEvent,
    getFilteredEventList, getLocalData,
    getMonthCalendarArr,
    getWeekCalendarArr,
    getWeekViewTitle, saveToLocal, updateEvent
} from "../../utils/commonFunctions";

let eventList = [];

const initialState = {
    selectedDate : moment(),
    monthViewTitle: moment().format("MMMM YYYY"),
    weekViewTitle: getWeekViewTitle(moment()),
    monthCalendarContentArr: getMonthCalendarArr(moment()),
    weekCalendarContentArr: getWeekCalendarArr(moment()),

    controlModalInfo: {
        id: '',
        show: false,
        title: '',
        startTime: '',
        endTime: '',
        type: 'add'
    },
    disable: false,
    eventListModalInfo: {
        show: false,
        eventList: []
    },
};

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case clientType.CHANGE_DATE_EVENT:
            let value = "";

            if (action.payload === "next_month") {
                value = state.selectedDate.add(1, "months");
            } else if (action.payload === "next_year") {
                value = state.selectedDate.add(1, "years");
            } else if (action.payload === "prev_month") {
                value = state.selectedDate.subtract(1, "months");
            } else if (action.payload === "prev_year") {
                value = state.selectedDate.subtract(1, "years");
            } else if (action.payload === 'prev_week') {
                value = state.selectedDate.subtract(1, 'weeks');
            } else if (action.payload === 'next_week') {
                value = state.selectedDate.add(1, 'weeks');
            }
            return {
                ...state,
                selectedDate: value,
                monthCalendarContentArr: [...getMonthCalendarArr(value, eventList)],
                weekCalendarContentArr: [...getWeekCalendarArr(value, eventList)],
                monthViewTitle: value.format("MMMM YYYY"),
                weekViewTitle: getWeekViewTitle(value),
            };
        case clientType.GOTO_TODAY_EVENT:
            let today = moment();
            return {
                ...state,
                selectedDate: today,
                monthViewTitle: today.format("MMMM YYYY"),
                weekViewTitle: getWeekViewTitle(today),
                monthCalendarContentArr: [...getMonthCalendarArr(today, eventList)],
                weekCalendarContentArr: [...getWeekCalendarArr(today, eventList)]
            };
        case clientType.FETCHED_EVENT_LIST:
            eventList = getFilteredEventList(action.payload);
            console.log('event list');
            console.log(eventList);
            return {
                ...state,
                disable: false,
                monthCalendarContentArr: [...getMonthCalendarArr(state.selectedDate, eventList)],
                weekCalendarContentArr: [...getWeekCalendarArr(state.selectedDate, eventList)]
            };
        case clientType.SHOW_CONTROL_MODAL:
            const {title, startTime, endTime, type, id} = action.payload;
            console.log('show--------------');
            return {
                ...state,
                controlModalInfo: {
                    ...state.controlModalInfo,
                    title,
                    startTime,
                    endTime,
                    show: true,
                    id,
                    type
                }
            };
        case clientType.HIDE_CONTROL_MODAL:
            return {
                ...state,
                controlModalInfo: {
                    ...state.controlModalInfo,
                    title: '',
                    startTime: '',
                    endTime: '',
                    show: false,
                    type: 'add'
                }
            };
        case clientType.SAVE_TO_LOCAL:

            eventList = addNewEvent(eventList, action.payload);
            let tempEventList = getLocalData();
            tempEventList = addNewEvent(tempEventList, action.payload);
            saveToLocal(eventList, tempEventList);
            return {
                ...state,

                monthCalendarContentArr: [...getMonthCalendarArr(state.selectedDate, eventList)],
                weekCalendarContentArr: [...getWeekCalendarArr(state.selectedDate, eventList)],
                eventListModalInfo: {
                    ...state.eventListModalInfo,
                    eventList: [...updateEvent(state.eventListModalInfo.eventList, action.payload)]
                },
                controlModalInfo: {
                    title: '',
                    startTime: '',
                    endTime: '',
                    show: false,
                    type: 'add'
                }
            };
        case clientType.SET_BUTTON_DISABLE:
            return {
                ...state,
                disable: action.payload
            };
        case clientType.SAVE_EVENT_SUCCESS:

            const {successType, data} = action.payload;
            if (successType === 'update') {
                eventList = updateEvent(eventList, data);
            } else {
                eventList = addNewEvent(eventList, data);
            }

            return {
                ...state,

                monthCalendarContentArr: [...getMonthCalendarArr(state.selectedDate, eventList)],
                weekCalendarContentArr: [...getWeekCalendarArr(state.selectedDate, eventList)],
                eventListModalInfo: {
                    ...state.eventListModalInfo,
                    eventList: [...updateEvent(state.eventListModalInfo.eventList, data)]
                },
                controlModalInfo: {
                    title: '',
                    startTime: '',
                    endTime: '',
                    show: false,
                    type: 'add'
                },
                disable: false
            };
        case clientType.DELETE_EVENT_SUCCESS:

            eventList = eventList.filter(item => {
                return item.id !== action.payload
            });

            let modalEvents = state.eventListModalInfo.eventList.filter(item => {
                return item.id !== action.payload
            });

            return {
                ...state,

                monthCalendarContentArr: [...getMonthCalendarArr(state.selectedDate, eventList)],
                weekCalendarContentArr: [...getWeekCalendarArr(state.selectedDate, eventList)],
                eventListModalInfo: {
                    ...state.eventListModalInfo,
                    eventList: [...modalEvents]
                },
                controlModalInfo: {
                    title: '',
                    startTime: '',
                    endTime: '',
                    show: false,
                    type: 'add'
                }
            };
        case clientType.SHOW_EVENTLIST_MODAL:

            return {
                ...state,

                eventListModalInfo: {
                    ...state.eventListModalInfo,
                    eventList: [...action.payload]
                }
            };

        case clientType.HIDE_EVENTLIST_MODAL:

            return {
                ...state,

                eventListModalInfo: {
                    ...state.eventListModalInfo,
                    eventList: []
                }
            };


    }

    return state;
};

export default clientReducer;
