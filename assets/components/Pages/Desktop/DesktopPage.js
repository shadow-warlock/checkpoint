import React, { Component } from "react";
import Skeleton from "../../Skeleton/Skeleton";
import {DESKTOP_PAGE_ID} from "../../../js/variables";
import '../../../css/desktop/desktop.css';
import DesktopContent from "./DesktopContent";

class DesktopPage extends Component {

    render() {
        return (
            <Skeleton selectedMenuItem={DESKTOP_PAGE_ID}>
                <DesktopContent/>
            </Skeleton>
        );
    }
}

export default DesktopPage;