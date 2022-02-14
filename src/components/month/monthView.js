import React from 'react';

import ControlBar from "./controlBar";
import WeekNameBar from "../weekNameBar";
import MonthContent from "./monthContent";

const MonthView = (props) => {

    return (
        <div>
            <ControlBar/>
            <WeekNameBar/>
            <MonthContent/>
        </div>

    )
};

export default MonthView;
