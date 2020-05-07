import React, { Component } from "react";

class VisitColumnHeader extends Component {

    render() {
        const content = this.props.content;
        return (
            <div>
                <div className={"visit-column-header"}>
                    {content}
                </div>
            </div>
        );
    }
}

export default VisitColumnHeader;