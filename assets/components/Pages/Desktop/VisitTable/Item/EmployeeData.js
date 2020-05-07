import React, { Component } from "react";

class EmployeeData extends Component {

    render() {
        return (
            <div className={"employee-info"}>
                <div className={"employee-full-name"}>
                    Иванов Иван Иванович
                </div>

                <div className={"employee-position"}>
                    Инженер
                </div>

                <div className={"employee-exit"}>
                    Вошел 7 минут назад
                </div>
            </div>
        );
    }
}

export default EmployeeData;