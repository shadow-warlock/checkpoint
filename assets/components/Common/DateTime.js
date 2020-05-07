import React, { Component } from "react";
import './../../css/common/datetime.css';

class DateTime extends Component {

    render() {
        return (
            <div className={"datetime"}>
                <div className={"time"}
                     style={{
                         background: this.props.style.timeBackground,
                         color: this.props.style.timeColor
                     }}>{this.props.time}</div>
                <div style={{color: this.props.style.dateColor}}>
                    {this.props.date}</div>
            </div>
        );
    }
}

export default DateTime;