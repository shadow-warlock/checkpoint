import React, { Component } from "react";
import VisitColumnHeader from "./VisitColumnHeader";

class VisitColumn extends Component {
    constructor(props) {
        super(props);

        this.autoLoading = this.autoLoading.bind(this);
    }

    autoLoading(event) {
        const scrolledArea = event.target.scrollTop;
        const visibleArea = event.target.clientHeight;
        const allArea = event.target.scrollHeight;
        if(scrolledArea + visibleArea >= allArea) {
            this.props.onLoad();
        }
        event.preventDefault();
    }

    render() {
        const header = this.props.header;
        const body = this.props.body;

        return (
            <div className={"visit-column"}>
                <VisitColumnHeader content={header}/>
                <div className={"visit-column-items-container"}
                     onScroll={this.autoLoading}>
                    {body}
                </div>
            </div>
        );
    }
}

export default VisitColumn;