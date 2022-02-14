import React, {useEffect, useState} from 'react';

import styled from 'styled-components';
import {getShowTitleStatus, getTimeFormatWithAMPM} from "../../utils/commonFunctions";
import EventDetail from "../eventDetail";
import {onShowControlModal, onShowEventListModal} from "../../reduxCtrl/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment-timezone";

const Cell = styled.div`
    width: calc(100%/7);
    min-width: 100px;
    height: 70px;
    border-left: solid 1px #dadce0;
`;
const WeekCell = (props) => {
    const [firstElements, setFirstElements] = useState([]);
    const [secondElements, setSecondElements] = useState([]);

    useEffect(() => {
        setFirstElements(props.data.events.slice(0, 2));
        setSecondElements(props.data.events.length > 2 ? props.data.events.slice(2) : []);
    }, [props.data]);

    const onShowDetail = (eventItem) => {
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
            {
                props.showTitle ?
                    <div style={{position: "absolute", left: '-32px'}}>
                        {getTimeFormatWithAMPM(props.data.hour)}
                    </div>
                    : null
            }
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

export default connect(null, mapDispatchToProps)(WeekCell);
