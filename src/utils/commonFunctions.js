import moment from "moment-timezone";

export const getWeekViewTitle = (selectedDate) => {
    let startDate = selectedDate.startOf('week').format("ll");
    let endDate = selectedDate.endOf('week').format("ll");

    return startDate + " ~ " + endDate;
};

export const getEventsForMonths = (strDate, eventList, colKey) => {

    let resArr = [];

    let tempEventList = [...eventList];

    tempEventList.forEach((event) => {
        if (event.start.type === 'date') {
            if(event.start.time > strDate || event.end.time < strDate) {
                return;
            }

        } else {
            let strStartDate = strDate + " 00:00:00";
            let strEndDate = moment(strDate).add(1, 'days').format('YYYY-MM-DD') + " 00:00:00";

            if(event.start.time >= strEndDate || event.end.time < strStartDate) {
                return;
            }
        }
        resArr.push(event);
    });

    return resArr;
};

export const getEventsForWeeks = (strStartTime, strEndTime, eventList, colKey) => {

    let resArr = [];

    let tempEventList = [...eventList];

    tempEventList.forEach((event) => {
        if(event.start.time >= strEndTime || event.end.time < strStartTime) {
            return;
        }
        resArr.push(event);
    });

    return resArr;
};

export const getMonthCalendarArr = (selectedDate, eventList = []) => {
    let res = [];
    let startDate = selectedDate.clone().startOf('month').startOf('week');

    let strCheckEndDate = startDate.clone().add(4, 'weeks').endOf('weeks').format('YYYY-MM-DD');

    // check end date
    let strStartDateOfMonth = selectedDate.clone().startOf('month').format('YYYY-MM-DD');
    let strEndDateOfMonth = selectedDate.clone().endOf('month').format('YYYY-MM-DD');

    let rows = [0, 1, 2, 3, 4];

    if (strCheckEndDate < strEndDateOfMonth) {
        rows.push(5);
    }

    let cols = [0, 1, 2, 3, 4, 5, 6];

    rows.forEach((row, rowKey) => {
        let tempRow = [];
        cols.forEach((col, colKey) => {
            let date = startDate.clone().add(row, 'weeks').add(col, 'days');
            let strDate = date.format('YYYY-MM-DD');
            let type = 'main';
            if (strDate < strStartDateOfMonth) {
                type = 'prev';
            } else if (strDate > strEndDateOfMonth) {
                type = 'next';
            }

            let isToday = false;
            if (strDate === moment().format('YYYY-MM-DD')) {
                isToday = true;
            }

            let events = getEventsForMonths(strDate, eventList, colKey);

            let tempCol = {
                strDate,
                isToday,
                dateVal: date.format('D'),
                type,
                events: [...events]
            };

            tempRow.push(tempCol)
        });
        res.push(tempRow);
    });

    return res;
};

export const getShowTitleStatus = (strDate, event, colKey) => {
    if (colKey === 0) {
        return true;
    }

    if (event.start.type === 'date') {
        if (event.start.time === strDate) {
            return true;
        }
    } else {
        let nextDate = moment(strDate).add(1, 'days').format('YYYY-MM-DD');

        if (event.start.time >= strDate && event.start.time < nextDate) {
            return true;
        }
    }

    return false;
};

export const getTimeFormat = (hour) => {
    let strHour = hour + "";
    if (hour < 10) {
        strHour = "0" + hour
    }

    return strHour + ":00";
};

export const getTimeFormatWithAMPM = (hour) => {
    let ampm = hour < 12 ? 'AM' : 'PM';
    let realHour = hour < 12 ? hour : hour - 12;
    let strHour = realHour + "";

    if (realHour < 10) {
        strHour = "0" + realHour
    }

    return strHour + " " + ampm;
};

export const getWeekCalendarArr = (selectedDate, eventList = []) => {
    let res = [];
    let startDate = selectedDate.clone().startOf('week');

    // check end date
    let rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    let cols = [0, 1, 2, 3, 4, 5, 6];

    rows.forEach((row, rowKey) => {
        let tempRow = [];
        cols.forEach((col, colKey) => {
            let date = startDate.clone().add(colKey, 'days');
            let strStartTime = date.format('YYYY-MM-DD') + " " + getTimeFormat(rowKey);
            let strEndTime = date.format('YYYY-MM-DD') + " " + getTimeFormat(rowKey + 1);
            let strDate = date.format('YYYY-MM-DD');
            let isToday = false;
            if (strDate === moment().format('YYYY-MM-DD')) {
                isToday = true;
            }

            let events = getEventsForWeeks(strStartTime, strEndTime, eventList, colKey);

            let tempCol = {
                strStartTime,
                strEndTime,
                strDate,
                isToday,
                hour: rowKey,
                dateVal: date.format('D'),
                events: [...events]
            };

            tempRow.push(tempCol)
        });
        res.push(tempRow);
    });

    console.log('result by filter', res);

    return res;
};

export const saveToLocal = (eventList, tempEventList) => {

    if (eventList.length < 1) {
        localStorage.removeItem("eventList")
    } else {
        localStorage.setItem("eventList", JSON.stringify(eventList));
    }

    if (tempEventList.length < 1) {
        localStorage.removeItem("tempEventList");
    } else {
        localStorage.setItem("tempEventList", JSON.stringify(tempEventList));
    }
};

export const getLocalData = () => {
    let data = localStorage.getItem("tempEventList");
    if (data === undefined || data == null) {
        return [];
    }

    return JSON.parse(data);
};

export const getLocalTime = (timeInfo) => {
    let time = "";
    let timeZone = "";
    let type = 'date';

    if (timeInfo.date !== undefined) {
        time = timeInfo.date;
    } else {
        // let uTime = moment.tz(timeInfo.dateTime, timeInfo.timeZone);
        // let localTz = moment.tz.guess();
        // let date = uTime.clone().tz(localTz);
        // time = moment(timeInfo.dateTime).format("YYYY-MM-DD HH:mm");
        // timeZone = timeInfo.timeZone;

        let dt = moment(timeInfo.dateTime).toDate();

        console.log('before', timeInfo.dateTime);
        time = moment(dt).format('YYYY-MM-DD HH:mm');
        console.log('after', time);

        console.log('------');

        timeZone = timeInfo.timeZone;
        type = 'datetime';
    }

    return {
        time,
        timeZone,
        type
    }
};

export const getFilteredEventList = (eventList) => {

    let resultArr = [];
    let tempArr = eventList.map((eventItem, key) => {
        return {
            id: eventItem.id,
            start: getLocalTime(eventItem.start),
            end: getLocalTime(eventItem.end),
            title: eventItem.summary
        }
    });

    tempArr.forEach(item => {
        let bInserted = false;

        for (let i = 0; i < resultArr.length; i++) {
            if (resultArr[i].start.time > item.start.time) {
                resultArr.splice(i, 0, item);
                bInserted = true;
                break;
            }
        }

        if (bInserted === false) {
            resultArr.push(item);
        }
    });

    // console.log('filter eventlist', eventList);

    return [...resultArr];
};

export const updateEvent = (eventList, updateEvent) => {

    let updatedFilterEvent = {
        id: updateEvent.id,
        start: getLocalTime(updateEvent.start),
        end: getLocalTime(updateEvent.end),
        title: updateEvent.summary
    };

    for (let i = 0; i < eventList.length; i++) {

        if (eventList[i].id === updatedFilterEvent.id) {
            eventList[i] = {
                ...updatedFilterEvent
            };
            break;
        }
    }

    // console.log('filter eventlist', eventList);

    return eventList;
};

export const addNewEvent = (eventList, newEvent) => {

    let newFilterEvent = {
        id: newEvent.id,
        start: getLocalTime(newEvent.start),
        end: getLocalTime(newEvent.end),
        title: newEvent.summary
    };

    let bInserted = false;
    for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].start.time > newFilterEvent.start.time) {
            eventList.splice(i, 0, newFilterEvent);
            bInserted = true;
            break;
        }
    }

    if (bInserted === false) {
        eventList.push(newFilterEvent);
    }

    // console.log('filter eventlist', eventList);

    return eventList;
};
