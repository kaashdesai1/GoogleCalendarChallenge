import React from 'react';
import styled from "styled-components";

const cols = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const WeekNameCell = (props) => {
    const Wrapper = styled.div`
        width: calc(100%/7);
        text-align: center;
        font-weight: bold;
        padding: 10px;
        background-color: ${props.selected ? '#17a2b8' : '#e9e9e9'};
        border-left: solid 1px #dadce0;
        color: ${props.selected ? (props.isHoliday ? 'red' : 'white') : (props.isHoliday ? 'red' : 'black')};
    `;
    return (
        <Wrapper isHoliday={props.isHoliday} >{props.value}</Wrapper>
    )
};

const WeekNameBar = (props) => {
    return (
        <div className='row px-0 mx-0' style={{
            borderBottom: "solid 1px #dadce0",
            borderRight: "solid 1px #dadce0",
            borderTop: "solid 1px #dadce0"
        }}
        >
            {
                cols.map((col, colKey) => (
                    <WeekNameCell isHoliday={colKey === 0 || colKey === 6} key={colKey} value={col}/>
                ))
            }
        </div>
    )
};

export default WeekNameBar;
