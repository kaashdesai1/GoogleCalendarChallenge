import React from 'react';
import WeekCell from "./weekCell";

import styled from 'styled-components';
import {onChangeDate, onGotoToday} from "../../reduxCtrl/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const Wrapper = styled.div`
`;
const WeekContent = (props) => {
    return (
        <Wrapper>
            {
                props.weekCalendarContentArr && props.weekCalendarContentArr.map((row, rowKey) => {
                    return (
                        <div className='row px-0 mx-0' style={{
                            borderBottom: "solid 1px #dadce0",
                            borderRight: "solid 1px #dadce0",
                            borderTop: rowKey === 0 ? "solid 1px #dadce0" : 'none'
                        }}
                             key={rowKey}>
                            {
                                row.map((col,colKey) => (
                                    <WeekCell key={rowKey + "-" + colKey} showTitle={colKey === 0} data={col} colNum={colKey}/>
                                ))
                            }
                        </div>
                    )

                })
            }
        </Wrapper>

    )
};

const mapStateToProps = (state) => ({
    weekCalendarContentArr: state.clientReducer.weekCalendarContentArr
});

const mapDispatchToProps = (dispatch) => {
    return {
        clientAction: bindActionCreators({
            onChangeDate,
            onGotoToday
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekContent);
