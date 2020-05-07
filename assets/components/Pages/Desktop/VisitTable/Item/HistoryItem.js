import React, { Component } from "react";
import ItemAvatar from "./ItemAvatar";
import ItemData from "./ItemData";
import DateTime from "../../../../Common/DateTime";
import {formatTime} from "../../../../../js/functions";
import {visitColumnTypes} from "../../../../../js/variables";

class HistoryItem extends Component {

    render() {
        const visit = this.props.data;
        const itemData = {
            fullName: visit.employee.name,
            position: visit.employee.position,
            comment: <div>Зона {visit.zone.name},<br/>Камера {visit.camera.name}</div>
        };

        const isInBuild = visit.type === visitColumnTypes.employee.inBuild;

        const datetimeStyles = {
            dateColor: "#3b4951",
            timeColor: "#fff",
            timeBackground: isInBuild ? "#75bdbd" : "#ce3944"
        };

        return (
            <div className={"visit-column-item"}>
                <div className={"history-datetime"}>
                    <DateTime style={datetimeStyles}
                              date={new Date(visit.time).toLocaleDateString()}
                              time={formatTime(new Date(visit.time))}/>
                    <div className={"history-event"}
                         style={{color: (isInBuild ? "#75bdbd" : "#ce3944")}}>
                        {isInBuild ? "вход" : "выход"}
                    </div>
                </div>
                <ItemAvatar avatar={visit.employee.faces.length >0 ? visit.employee.faces[0].src : null}/>
                <ItemData data={itemData} style={{color: isInBuild ? "#75bdbd" : "#ce3944"}}/>
            </div>
        );
    }
}

export default HistoryItem;