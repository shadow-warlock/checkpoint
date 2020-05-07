import React, { Component } from "react";

class PersonalHistoryButton extends Component {

    render() {
        return (
            <div className={"personal-history-button"} onClick={this.props.onClick}>
                <div>Персональная</div><div>история</div>
            </div>
        );
    }
}

export default PersonalHistoryButton;