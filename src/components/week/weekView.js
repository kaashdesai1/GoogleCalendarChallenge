import React from 'react';

import styled from 'styled-components';
import ControlBar from "./controlBar";
import WeekNameBar from "../weekNameBar";
import DateNameBar from "./dateNameBar";
import WeekContent from "./weekCotent";

const SelectButton = styled.button`
    width: 120px;
`;

const WeekView = (props) => {

    return (
        <div>
            <ControlBar/>
            <WeekNameBar/>
            <DateNameBar/>
            <WeekContent/>
        </div>

    )
};

export default WeekView;
