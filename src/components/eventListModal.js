import React, {useEffect, useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import EventDetail from "./eventDetail";
import moment from "moment-timezone";
import {
    onShowControlModal
} from "../reduxCtrl/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const EventListModal = (props) => {

    const {data} = props;

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
        <Modal
            show={data.eventList && data.eventList.length > 0}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <h3 className="text-center">
                    Event List
                </h3>
                {
                    data.eventList && data.eventList.map((eventItem, key) => {
                        return (
                            <EventDetail key={key}
                                         showTitle={true}
                                         title={eventItem.title}
                                         onClick={() => onShowDetail(eventItem)}/>
                        )
                    })
                }
                <div className="row py-2 align-items-center">
                    <div className="col-12 text-center">
                        <button type="button" className="btn btn btn-info" onClick={props.onCloseModal} style={{width: '100px'}}>
                            Close
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state) => ({
    controlModalInfo: state.clientReducer.controlModalInfo,
    eventListModalInfo: state.clientReducer.eventListModalInfo
});

const mapDispatchToProps = (dispatch) => {
    return {
        clientAction: bindActionCreators({
            onShowControlModal,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventListModal);
