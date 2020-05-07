import React, { Component } from "react";
import {menuItems} from "../../../js/variables";

class MenuBar extends Component {
    render() {
        return (
            <div className={"menu-bar"}>
                {menuItems.map(item =>
                    <a className={"menu-item " +
                           (this.props.selectedItem === item.id
                               ? "selected" : "")}
                       href={item.link}
                       key={item.id}>{item.name}</a>
                )}
            </div>
        );
    }
}

export default MenuBar;