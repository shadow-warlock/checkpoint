import React, { Component } from "react";
import logo from './../../../img/logo.png';

class Logo extends Component {
    render() {
        return (
            <div className={"logo"}>
                <img src={logo}/>
                <div className={"logo-name"}>
                    Умная<br/>Проходная
                </div>
            </div>
        );
    }
}

export default Logo;