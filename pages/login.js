// pages for app

import React, {useEffect, useState} from 'react';
import ApiCalendar from "react-google-calendar-api";
import {useNavigate} from "react-router-dom";

import styled from 'styled-components';

import googleIcon from '../assets/images/google-icon.png';

const Title = styled.h1`
    margin: auto;
    color: #1c91b7 !important;
`;

const Explain = styled.h3`
    margin: auto;
    padding-top: 40px;
`;

const GoogleLoginButton = styled.button`
    height: 50px;
    margin-top: 40px;
    display: flex;
    margin: auto;
    background-color: white;
    padding: 15px 15px;
`;

let timer = null;

const Login = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (ApiCalendar.sign) {
            // goto calendar
            navigate('/');
        }
    }, []);

    const onLogin = () => {
        ApiCalendar.handleAuthClick().then((res) => {
            timer = setInterval(() => {
                if (ApiCalendar.sign) {
                    clearInterval(timer);
                    navigate('/');
                }
            }, 200);
        });
    };

    return (
        <div className={'row py-5 text-center'}>
            <div className="col-8" style={{margin: 'auto', paddingTop: '100px'}}>
                <Title>Welcome!</Title>
                <Explain>
                    Please login with google
                </Explain>
                <div className="py-5">
                    <GoogleLoginButton onClick={() => onLogin()} className="align-items-center justify-content-center btn btn-large btn-outline-info">
                        <img src={googleIcon} style={{width: '30px', height: '30px'}} alt={""}/>
                        &nbsp; &nbsp;<h3>Login with google</h3>
                    </GoogleLoginButton>
                </div>
            </div>
        </div>
    )
};

export default Login;
