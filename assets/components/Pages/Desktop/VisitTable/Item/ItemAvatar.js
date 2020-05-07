import React, { Component } from "react";
import avatar from './../../../../../img/default-avatar.png';

class ItemAvatar extends Component {

    render() {
        return (
            <div className={"visit-column-item-avatar"}>
                <img src={this.props.avatar ? this.props.avatar : avatar}/>
            </div>
        );
    }
}

export default ItemAvatar;