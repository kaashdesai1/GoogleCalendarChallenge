import React, {useEffect, useState} from 'react';

import styled from 'styled-components';
import DateAvatar from "../dateAvatar";
import EventDetail from "../eventDetail";
import {getShowTitleStatus} from "../../utils/commonFunctions";
import {onChangeDate, onGotoToday, onShowControlModal, onShowEventListModal} from "../../reduxCtrl/actions";
import {bindActionCreators} from "redux";
import moment from 'moment-timezone';
import {connect} from "react-redux";

const Cell = styled.div`
    width: calc(100%/7);
    min-width: 100px;
    height: 160px;
    border-left: solid 1px #dadce0;
`;

const MonthCell = (props) => {
    const [firstElements, setFirstElements] = useState([]);
    const [secondElements, setSecondElements] = useState([]);

    useEffect(() => {
        setFirstElements(props.data.events.slice(0, 3));
        setSecondElements(props.data.events.length > 3 ? props.data.events.slice(3) : []);
    }, [props.data]);

    const onShowDetail = (eventItem) => {
        console.log(eventItem);
        let data = {
            title: eventItem.title,
            startTime: moment(eventItem.start.time).format('YYYY-MM-DD') + "T" + moment(eventItem.start.time).format("HH:mm"),
            endTime: moment(eventItem.end.time).format('YYYY-MM-DD') + "T" + moment(eventItem.end.time).format("HH:mm"),
            type: 'update',
            id: eventItem.id
        };

        props.clientAction.onShowControlModal(data, 'update');
    };

    return (
        <Cell>
            <div className='text-center py-1'>
                <DateAvatar isHoliday={props.isHoliday} type={props.data.type} number={props.data ? props.data.dateVal : ""} title={props.data.strDate} selected={props.data.isToday}/>
            </div>
            {
                firstElements.map((eventItem, key) => {
                    return (
                        <EventDetail key={key}
                                     showTitle={getShowTitleStatus(props.data.strDate, eventItem, props.colKey)}
                                     title={eventItem.title}
                                     onClick={() => onShowDetail(eventItem)}/>
                    )
                })
            }
            {
                secondElements.length > 0 ?
                    <div style={{
                        backgroundColor: '#4cd1f9',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        cursor: 'pointer'
                    }}
                        onClick={() => props.clientAction.onShowEventListModal(secondElements)}
                    >
                        {secondElements.length} More
                    </div>
                    : null
            }

        </Cell>
    )
};

const mapStateToProps = (state) => ({
    monthViewTitle: state.clientReducer.monthViewTitle
});

const mapDispatchToProps = (dispatch) => {
    return {
        clientAction: bindActionCreators({
            onShowControlModal,
            onShowEventListModal
        }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(MonthCell);
