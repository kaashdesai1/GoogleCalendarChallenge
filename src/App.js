import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./pages/calendar";
import Login from "./pages/login";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
`;
const App = () => {

    return (
        <Wrapper className="container">
            <Router>
                <Routes>
                    <Route path={'/'} element={<Calendar/>}/>
                    <Route path={'/login'} default element={<Login/>}/>
                </Routes>
            </Router>
        </Wrapper>
    )
};

export default App;
