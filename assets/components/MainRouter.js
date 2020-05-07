import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import '../css/main.css';
import DesktopPage from "./Pages/Desktop/DesktopPage";

class MainRouter extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/desktop" children={<DesktopPage/>} />
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;