import React, { Component } from "react";
import ItemAvatar from "./ItemAvatar";
import ItemData from "./ItemData";
import {visitColumnTypes} from "../../../../../js/variables";
import {makeLastVisitDatetime} from "../../../../../js/functions";
import {getZone} from "../../../../../js/axios";
import PersonalHistoryButton from "./PersonalHistoryButton";

class EmployeeItem extends Component {

    render() {
        const type = this.props.type;
        const employee = this.props.data;

        const zoneName = employee.lastVisits.length ?
            employee.lastVisits[0].zone.name : "Отсутствует";
        const dateTime = employee.lastVisits.length ?
            new Date(employee.lastVisits[0].time) :
            new Date();

        const comment =
            <div>
                {(type === visitColumnTypes.employee.inBuild
                ? "Вошел" : "Вышел") + " " +
                makeLastVisitDatetime(dateTime)},
                <br/>
                Зона {zoneName}
            </div>;

        const itemData = {
            fullName: employee.name,
            position: employee.position,
            comment: comment
        };

        const itemColor = type === visitColumnTypes.employee.inBuild
            ? "#75bdbd" : "#ce3944";
        return (
            <div className={"visit-column-item " +
            (employee.id === this.props.selectedUser
                ? "selected" : "")}>
                <ItemAvatar avatar={employee.faces.length >0 ? employee.faces[0].src : null}/>
                <ItemData data={itemData} style={{color: itemColor}}/>
                <PersonalHistoryButton onClick={() =>
                {this.props.getPersonalHistory(employee.id)}} />
            </div>
        );
    }
}

export default EmployeeItem;