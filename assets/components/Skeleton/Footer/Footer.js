import React, { Component } from "react";
import '../../../css/footer.css';
import ShortStatistics from "./ShortStatistics";
import DateTime from "../../Common/DateTime";
import {formatTime} from "../../../js/functions";

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: new Date().toLocaleDateString(),
            currentTime: formatTime(new Date())
        };

        setInterval(() => {
            this.setState({
                currentDate: new Date().toLocaleDateString(),
                currentTime: formatTime(new Date())
            });
        },1000);
    }
    render() {
        const datetimeStyles = {
            dateColor: "#fff",
            timeColor: "#3b4951",
            timeBackground: "#fff"
        };

        return (
            <div className={"footer"}>
                <ShortStatistics/>
                <DateTime date={this.state.currentDate}
                          time={this.state.currentTime}
                          style={datetimeStyles}/>
            </div>
        );
    }
}

export default Footer;