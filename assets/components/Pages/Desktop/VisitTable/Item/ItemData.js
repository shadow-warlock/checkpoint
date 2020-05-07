import React, { Component } from "react";

class ItemData extends Component {

    render() {
        return (
            <div className={"employee-info"}>
                <div className={"employee-full-name"}>
                    {this.props.data.fullName}
                </div>
                <div className={"employee-position"}>
                    {this.props.data.position}
                </div>
                <div style={{color: this.props.style.color}}>
                    {this.props.data.comment}
                </div>
            </div>
        );
    }
}

export default ItemData;