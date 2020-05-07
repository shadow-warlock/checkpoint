import React, { Component } from "react";
import TabBar from "./TabBar";
import VisitTable from "./VisitTable/VisitTable";
import {getZones} from "../../../js/axios";

class DesktopContent extends Component {
    constructor(props) {
        super(props);
        const self = this;

        this.state = {
            zones: [],
            selectedZone: null
        };

        getZones().then(function (result) {
            const zones = result.data;
            self.setState({
                zones: zones,
                selectedZone: null
            });
        });

        this.changeZone = this.changeZone.bind(this);
    }

    changeZone(newZone) {
        this.setState({
            selectedZone: newZone
        });
    }

    render() {
        return (
            <div className={"desktop-content"}>
                <TabBar zones={this.state.zones}
                        onTabClick={this.changeZone}
                        selectedZone={this.state.selectedZone}/>

                <VisitTable zone={this.state.selectedZone}/>
            </div>
        );
    }
}

export default DesktopContent;