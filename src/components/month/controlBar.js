import React, {useState} from 'react';
import {AiOutlineLeft, AiOutlineDoubleLeft, AiOutlinePlus, AiOutlineRight, AiOutlineDoubleRight} from 'react-icons/ai';
import styled from 'styled-components';
import {connect} from "react-redux";

import {onChangeDate, onGotoToday, onShowControlModal} from "../../reduxCtrl/actions";
import {bindActionCreators} from "redux";

const ControlButton = styled.button`
    min-width: 40px;
`;
const Wrapper = styled.div`
    background-color: #ddd;
    margin-bottom: 4px;
    padding-top: 10px; 
    padding-bottom: 10px;
`;
const ControlBar = (props) => {

    return (
        <Wrapper className="align-items-center justify-content-center row px-0 mx-0 py-1">
            <div className="col-lg-2 col-sm-12">
                <ControlButton className="btn btn-sm btn-info" onClick={() => props.clientAction.onShowControlModal()}>
                    <AiOutlinePlus title="Add Event"/> Add
                </ControlButton>
            </div>
            <div className="col-lg-8 col-sm-12 mx-0 px-0">
                <div className="row mx-0 py-0 align-items-center">
                    <div className="col-lg-3 col-sm-12 text-center">
                        <ControlButton className="btn btn-outline-danger btn-sm" onClick={() => props.clientAction.onChangeDate("prev_year")}>
                            <AiOutlineDoubleLeft/>
                        </ControlButton>
                        &nbsp;
                        <ControlButton className="btn btn-outline-danger btn-sm" onClick={() => props.clientAction.onChangeDate("prev_month")}>
                            <AiOutlineLeft/>
                        </ControlButton>
                    </div>
                    <div className="col-lg-6 col-sm-12 text-center font-weight-bold"
                         style={{fontSize: '1.5em'}}
                    >
                        {props.monthViewTitle}
                    </div>
                    <div className="col-lg-3 col-sm-12">
                        <ControlButton className="btn btn-outline-danger btn-sm" onClick={() => props.clientAction.onChangeDate("next_month")}>
                            <AiOutlineRight/>
                        </ControlButton>
                        &nbsp;
                        <ControlButton className="btn btn-outline-danger btn-sm" onClick={() => props.clientAction.onChangeDate("next_year")}>
                            <AiOutlineDoubleRight/>
                        </ControlButton>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-sm-12 text-right" onClick={() => props.clientAction.onGotoToday()}>
                <button className="btn btn-info btn-sm">
                    Today
                </button>
            </div>
        </Wrapper>
    )
};

const mapStateToProps = (state) => ({
    monthViewTitle: state.clientReducer.monthViewTitle
});

const mapDispatchToProps = (dispatch) => {
    return {
        clientAction: bindActionCreators({
            onChangeDate,
            onGotoToday,
            onShowControlModal
        }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
