import React, {Component} from "react";
import {visitColumnTypes} from "../../../js/variables";
import {getAllEmployeesNumberToday, getVisitsNumberToday} from "../../../js/axios";
import {getUnrecognizedNumberToday} from "../../../js/axios";

class ShortStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitsInToday: 0,
            visitsOutToday: 0,
            unrecognizedToday: 0,
            allEmployeesToday: 0
        };
        this.updateStatistics();
    }

    updateStatistics() {
        let self = this;
        getVisitsNumberToday(visitColumnTypes.employee.inBuild)
            .then(function (result) {
                self.setState({
                    visitsInToday: result.data
                })
            });

        getVisitsNumberToday(visitColumnTypes.employee.outBuild)
            .then(function (result) {
                self.setState({
                    visitsOutToday: result.data
                })
            });

        getUnrecognizedNumberToday()
            .then(function (result) {
                self.setState({
                    unrecognizedToday: result.data
                })
            });

        getAllEmployeesNumberToday()
            .then(function (result) {
                self.setState({
                    allEmployeesToday: result.data
                })
            });
    }

    render() {
        return (
            <div className={"short-statistics-bar"}>
                <div className={"statistics-item"}>
                    Входов сегодня: {this.state.visitsInToday}</div>
                <div className={"statistics-item"}>
                    Выходов сегодня: {this.state.visitsOutToday}</div>
                <div className={"statistics-item"}>
                    Нераспознанных сегодня: {this.state.unrecognizedToday}</div>
                <div className={"statistics-item"}>
                    Людей в базе: {this.state.allEmployeesToday}</div>
            </div>
        );
    }
}

export default ShortStatistics;