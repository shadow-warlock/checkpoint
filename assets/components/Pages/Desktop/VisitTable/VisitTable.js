import React, { Component } from "react";
import './../../../../css/desktop/visit-table.css';
import EmployeeColumn from "./VisitColumn/EmployeeColumn";
import {visitColumnTypes} from "../../../../js/variables";
import HistoryColumn from "./VisitColumn/HistoryColumn";

class VisitTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: null
        };

        this.selectUser = this.selectUser.bind(this);
    }

    selectUser(id) {
        this.setState((state) => {
                return {selectedUser:
                        state.selectedUser === id ? null : id}
        });
    }

    render() {
        const zone = this.props.zone;
        return (
            <div className={"visit-table"}>
                <EmployeeColumn selectedUser={this.state.selectedUser}
                                type={visitColumnTypes.employee.inBuild}
                                getPersonalHistory={this.selectUser}
                                zone={zone}/>
                <EmployeeColumn selectedUser={this.state.selectedUser}
                                type={visitColumnTypes.employee.outBuild}
                                getPersonalHistory={this.selectUser}
                                zone={zone}/>
                <HistoryColumn selectedUser={this.state.selectedUser}
                               zone={zone}/>
            </div>
        );
    }
}

export default VisitTable;