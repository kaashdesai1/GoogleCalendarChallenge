import React from 'react';

const EventDetail = (props) => {

    return (
        <div style={{
            backgroundColor: "#44e5f9",
            marginBottom: '4px',
            height: '24px',
            cursor: 'pointer',
            paddingLeft: '6px',
            paddingRight: '6px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: "hidden"
        }} onClick={props.onClick}>
            {props.showTitle === true ? (props.title === undefined ? 'No title' : props.title) : ""}
        </div>
    )
};

export default EventDetail;
