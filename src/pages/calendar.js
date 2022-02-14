import React, {useEffect, useState} from 'react';

import ApiCalendar from "react-google-calendar-api";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import MonthView from "../components/month/monthView";
import WeekView from "../components/week/weekView";

import {BiLogOutCircle} from 'react-icons/bi';
import {
    onDeleteEventSuccess,
    onFetchedEventList,
    onHideControlModal, onHideEventListModal,
    onSaveEventSuccess, onSaveToLocal, onSetButtonDisable
} from "../reduxCtrl/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ControlModal from "../components/controlModal";
import EventListModal from "../components/eventListModal";
import {getLocalData, saveToLocal} from "../utils/commonFunctions";

let timer = null;
const Title = styled.h1`
    margin: auto;
    color: #1c91b7 !important;
`;

const SelectButton = styled.button`
    width: 120px;
`;

const Calendar = (props) => {

    const navigate = useNavigate();

    const [selectView, setSelectView] = useState("month");

    const onFetch = () => {
        // fetch
        ApiCalendar.listEvents({
            orderBy: 'updated'
        }).then(({result}) => {
            props.clientAction.onFetchedEventList(result.items);
            console.log('result==', result.items);
        }).catch((err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        if (!ApiCalendar.sign) {
            // go to login
            navigate('./login');
        } else {
            onFetch();
        }

    }, []);

    const onLogout = () => {
        ApiCalendar.handleSignoutClick();

        timer = setInterval(() => {
            if (!ApiCalendar.sign) {
                clearInterval(timer);
                // navigate('./login');
            }
        }, 200);
    };

    const onDeleteEvent = (id) => {
        if (!ApiCalendar.sign) {
            // go to login
            navigate('./login');
        } else {

            if (id === '' || id === undefined || id == null) {
                alert("You cannot delete because network has issue.")
            } else {
                ApiCalendar.deleteEvent(id)
                    .then((res) => props.clientAction.onDeleteEventSuccess(id))
                    .catch((err) => console.log(err))
            }
        }
    };

    const onSaveEvent = (data) => {
        if (!ApiCalendar.sign) {
            // go to login
            navigate('./login');
        } else {

            props.clientAction.onSetButtonDisable(true);

            let type = data.type;
            let id = data.id;

            const event = {
                summary: data.title,
                start: {
                    dateTime: data.startTime
                },
                end: {
                    dateTime: data.endTime
                }
            };

            if (type === 'add') {
                ApiCalendar.createEvent(event)
                    .then(async (res) => {
                        let tempEventList = getLocalData();
                        if (tempEventList.length > 0) {
                            for (let i = 0; i < tempEventList; i++) {
                                if (ApiCalendar.sign) {
                                    await ApiCalendar.createEvent(tempEventList[i]);
                                }
                            }

                            saveToLocal([], []);
                            onFetch();
                        } else {
                            props.clientAction.onSaveEventSuccess(res.result)
                        }
                    })
                    .catch((err) => {
                        props.clientAction.onSaveToLocal(event);
                        console.log('errr', err);
                    })
            } else {
                if (id === '' || id === undefined || id == null) {
                    alert("You cannot update because network is not working...");
                } else {
                    ApiCalendar.updateEvent(event, id)
                        .then((res) => props.clientAction.onSaveEventSuccess(res.result, 'update'))
                        .catch((err) => {
                            props.clientAction.onSetButtonDisable(false);
                            alert('network error!')
                        })
                }
            }
        }
    };

    return (
        <div>
            <ControlModal data={props.controlModalInfo}
                          onCancel={() => props.clientAction.onHideControlModal()}
                          onSave={(data) => onSaveEvent(data)}
                          onDelete={(id) => onDeleteEvent(id)}
                          disable={props.disable}
            />

            <EventListModal data={props.eventListModalInfo} onCloseModal={() => props.clientAction.onHideEventListModal()}/>
            <div className="row py-2">
                <div className="col-12 text-right" style={{margin: "auto"}}>
                    <button className="btn btn-outline-danger"
                                  onClick={() => onLogout()}
                                  title="logout">
                        <BiLogOutCircle/>Logout
                    </button>
                </div>
            </div>
            <div className="row py-2 align-items-center">
                <div className="col-9">
                    <Title>My Google Calendar</Title>
                </div>
                <div className="col-3 text-right">
                    <SelectButton
                        onClick={() => setSelectView('month')}
                        className={`btn ${selectView === 'month' ? 'btn-info' : 'btn-outline-info'}`}>
                        Month
                    </SelectButton>
                    &nbsp; &nbsp;
                    <SelectButton
                        onClick={() => setSelectView('week')}
                        className={`btn ${selectView === 'week' ? 'btn-info' : 'btn-outline-info'}`}>
                        Week
                    </SelectButton>
                </div>
            </div>
            <div className='row py-2'>
                <div className='col-12'>
                    {
                        selectView === 'month' ?
                            <MonthView/>
                            :
                            <WeekView/>
                    }
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = (state) => ({
    controlModalInfo: state.clientReducer.controlModalInfo,
    eventListModalInfo: state.clientReducer.eventListModalInfo,
    disable: state.clientReducer.disable
});

const mapDispatchToProps = (dispatch) => {
    return {
        clientAction: bindActionCreators({
            onFetchedEventList,
            onHideControlModal,
            onSaveEventSuccess,
            onDeleteEventSuccess,
            onHideEventListModal,
            onSaveToLocal,
            onSetButtonDisable
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
