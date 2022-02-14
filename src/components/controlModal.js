import React, {useEffect, useState} from 'react';
import {Modal, Button} from "react-bootstrap";
import moment from "moment-timezone";

const ControlModal = (props) => {

    const [eventTitle, setEventTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        setEventTitle(props.data.title);
        setStartTime(props.data.startTime);
        setEndTime(props.data.endTime);
    }, [props.data]);

    const onSave = (e) => {
        e.preventDefault();

        if (props.disable === true) {
            return;
        }

        let data = {
            title: eventTitle,
            startTime: moment(startTime).format(),
            endTime: moment(endTime).format(),
            type: props.data.type,
            id: props.data.id
        };

        props.onSave(data);

    };

    const onChangeEvent = (event, eventType) => {
        if (eventType === 'eventTitle') {
            setEventTitle(event.target.value);
        } else if (eventType === 'startTime') {
            setStartTime(event.target.value);
        } else {
            setEndTime(event.target.value);
        }
    };

    return (
        <Modal
            show={props.data.show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                <form onSubmit={onSave}>
                    <h3 className="text-center">{props.data.type === 'update' ? 'Change' : 'Add'} Event</h3>
                    <div className="row py-2 align-items-center">
                        <div className="col-12">
                            <label>Event Title</label>
                            <input type="text" className="form-control" value={eventTitle} onChange={(e) => onChangeEvent(e, 'eventTitle')} />
                        </div>
                    </div>
                    <div className="row py-2 align-items-center">
                        <div className="col-12">
                            <label>Start Time</label>
                            <input type="datetime-local" value={startTime} onChange={(e) => onChangeEvent(e, 'startTime')} className="form-control" required/>
                        </div>
                    </div>
                    <div className="row py-2 align-items-center">
                        <div className="col-12">
                            <label>End Time</label>
                            <input type="datetime-local" value={endTime} onChange={(e) => onChangeEvent(e, 'endTime')} className="form-control" required/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row py-2 align-items-center">
                        <div className="col-12 text-center">

                            <button type="submit" className={props.disable === true ? 'btn btn btn-info mx-1 disabled' : 'btn btn btn-info mx-1 '} style={{width: '100px'}}>
                                Save
                            </button>
                            <button type="button" onClick={() => {
                                if (props.disable !== true) {
                                    props.onCancel();
                                }
                            }}
                                    className={props.disable === true ? 'btn btn btn-danger mx-1 disabled' : 'tn btn btn-danger mx-1'} style={{width: '100px'}}>
                                Cancel
                            </button>
                            {
                                props.data.type === 'update' ?
                                    <button type="button" onClick={() => props.onDelete(props.data.id)} className="btn btn btn-warning mx-1" style={{width: '100px'}}>
                                        Delete
                                    </button> : null
                            }
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
};

export default ControlModal;
