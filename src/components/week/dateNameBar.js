import React from 'react';
import styled from "styled-components";
import DateAvatar from "../dateAvatar";
import {connect} from "react-redux";

const DateNameBar = (props) => {
    const Cell = styled.div`
        width: calc(100%/7);
        text-align: center;
        font-weight: bold;
        padding: 10px;
    `;

    let data = props.weekCalendarContentArr.length > 0 ? props.weekCalendarContentArr[0] : [];
    return (
        <div className='row px-0 mx-0' style={{
            border: "solid 1px #dadce0",
            borderLeft: "none"
        }}
        >
            {
                data.map((col, colKey) => (
                    <Cell key={colKey} style={{
                        borderLeft: "solid 1px #dadce0"
                    }}>
                        <DateAvatar title={col.strDate} isHoliday={colKey === 0 || colKey === 6} selected={col.isToday} number={col.dateVal}/>
                    </Cell>
                ))
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    weekCalendarContentArr: state.clientReducer.weekCalendarContentArr
});

export default connect(mapStateToProps, null)(DateNameBar);
