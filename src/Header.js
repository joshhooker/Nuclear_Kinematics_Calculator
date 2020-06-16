import React from "react";

import "./Header.scss";


class Header extends React.Component {
    render() {
        return (
            <div className="component-header">
                <div className="header-container">
                    <h1 className="header-title">
                        Nuclear Kinematics Calculator
                    </h1>
                </div>
            </div>
        );
    }
}
export default Header;