import React, { Component } from "react";
import Menu from "./Menu/Menu";
import Footer from "./Footer/Footer";

class Skeleton extends Component {

    render() {
        return (
            <div className={"skeleton"}>
                <Menu selectedItem={this.props.selectedMenuItem}/>
                <div className={"content"}>{this.props.children}</div>
                <Footer/>
            </div>
        );
    }
}

export default Skeleton;