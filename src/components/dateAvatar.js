import React from 'react';

import styled from 'styled-components';


const DateAvatar = (props) => {

    const getBackgroundColor = () => {
    };

    const Wrapper = styled.div`
        display: flex;
        width: 40px;
        height: 40px;
        margin: auto;
        font-weight: bold;
        cursor: pointer;
        opacity: ${props.type === 'prev' || props.type === 'next' ? 0.6 : 1};
        background-color: ${props.selected ? '#17a2b8' : '#ddead4'};
        color: ${props.selected ? (props.isHoliday ? 'red' : 'white') : (props.isHoliday ? 'red' : 'black')};
        border-radius: 50%
    `;
    return (
        <Wrapper className="align-items-center justify-content-center" title={props.title}>
            {props.number}
        </Wrapper>
    )
};

export default DateAvatar;
