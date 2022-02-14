import React from 'react';
import MonthCell from "./monthCell";
import {onChangeDate, onGotoToday} from "../../reduxCtrl/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getShowTitleStatus} from "../../utils/commonFunctions";

const MonthContent = (props) => {
    return (
        <>
            {
                props.monthCalendarContentArr.map((row, rowKey) => {
                    return (
                        <div className='row px-0 mx-0' style={{
                            borderBottom: "solid 1px #dadce0",
                            borderRight: "solid 1px #dadce0",
                            borderTop: rowKey === 0 ? "solid 1px #dadce0" : 'none'
                        }}
                             key={rowKey}>
                            {
                                row.map((col,colKey) => (
                                    <MonthCell isHoliday={colKey === 0 || colKey === 6} key={rowKey + "-" + colKey} colKey={colKey} data={col}/>
                                ))
                            }
                        </div>
                    )

                })
            }
        </>
    )
};

const mapStateToProps = (state) => ({
    monthCalendarContentArr: state.clientReducer.monthCalendarContentArr
});

const mapDispatchToProps = (dispatch) => {
    return {
        clientAction: bindActionCreators({
            onChangeDate,
            onGotoToday
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthContent);
