import React from 'react';

import './App.scss';

import Header from "./Header";
import Content from "./Content";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="component-app">
                <Header />
                <Content />
            </div>
        );
    }
}

export default App;
