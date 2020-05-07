import React, { Component } from "react";

class TabItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopped: false
        };

        this.popUpName = this.popUpName.bind(this);
        this.popDownName = this.popDownName.bind(this);
    }

    popUpName(event) {
        event.preventDefault();
        this.setState({
            isPopped: true
        });
    }

    popDownName(event) {
        event.preventDefault();
        this.setState({
            isPopped: false
        });
    }

    render() {
        const isSelected = this.props.selected;
        let name = this.props.name;
        const tabText = name.length > 18 ?
            (name.substr(0,13) + "...") : name;

        const tabPopUp = name.length <= 18
            ? "" :
            <div className={"tab-pop-up"} hidden={!this.state.isPopped}>
                {name}
            </div>;
        return (
            <div className={"tab-item " +
                    (isSelected ? "selected" : "")}
                 onClick={this.props.onClick}
                 onMouseOver={this.popUpName}
                 onMouseOut={this.popDownName}
            >
                {tabText}

                {tabPopUp}
            </div>
        );
    }
}

export default TabItem;