import React, { Component } from "react";
import TabItem from "./VisitTable/TabItem";

class TabBar extends Component {
    render() {
        const onClick = this.props.onTabClick;
        const selectedZone = this.props.selectedZone;
        const zones = this.props.zones;
        const defaultZone = null;
        return (
            <div className={"tab-bar"}>
                <TabItem key={"all"}
                         name={"Все зоны"}
                         onClick={() => {onClick(defaultZone);}}
                         selected={defaultZone === selectedZone}/>
                {zones.map((zone) =>
                    <TabItem key={zone.id}
                             name={zone.name}
                             onClick={() => {onClick(zone.id);}}
                             selected={zone.id === selectedZone}/>
                )}
            </div>
        );
    }
}

export default TabBar;