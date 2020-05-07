import React, { Component } from "react";
import '../../../css/menu.css';
import Logo from "./Logo";
import MenuBar from "./MenuBar";
import Exit from "./Exit";

class Menu extends Component {
    render() {
        return (
            <div className={"menu"}>
                <Logo/>
                <MenuBar selectedItem={this.props.selectedItem}/>
                <Exit/>
            </div>
        );
    }
}

export default Menu;