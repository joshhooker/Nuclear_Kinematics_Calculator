import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';

import './Graph.scss';
import './react-vis_style.css';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearestXY: false,
            width: 960,
            height: 600
        }
    };

    render() {

        const {
            title,
            data_light,
            data_heavy,
            x_label,
            y_label,
            use_items,
            use_heavy_item,
        } = this.props;

        const {
            width,
            height
        } = this.state

        const x_domain = [0, 180];
        const y_domain = [0, 100];

        const isValid = Object.keys(data_light).length !== 0;

        return (
            <div className="graph-wrapper full-width m-r-20 m-b-20">
                <div className="header-wrapper m-b-15">
                    <h2 className="graph-title">
                        {title}
                    </h2>
                </div>
                <div className="graph">
                    <LineGraph
                        data_light={data_light}
                        data_heavy={data_heavy}
                        x_domain={x_domain}
                        y_domain={y_domain}
                        x_label={x_label}
                        y_label={y_label}
                        width={width}
                        height={height}
                        isValid={isValid}
                        use_items={use_items}
                        use_heavy_item={use_heavy_item}
                    />
                </div>
            </div>
        );
    }
}


class LineGraph extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !(nextProps.data_light === this.props.data_light);
    }

    state = {
        useCanvas: false
    };

    render() {
        const {
            data_light,
            data_heavy,
            x_domain,
            y_domain,
            x_label,
            y_label,
            isValid,
            width,
            height,
            use_items,
            use_heavy_item,
        } = this.props;

        const lineSeriesPropsLight = {
            animation: true,
            opacityType: 'literal',
            stroke: 'blue',
            data: data_light,
        };

        const lineSeriesPropsHeavy = {
            animation: true,
            opacityType: 'literal',
            stroke: 'red',
            data: data_heavy,
        };

        let ITEMS = []

        if (use_heavy_item) {
            ITEMS = [
                { title: 'Light Recoil', color: 'blue', strokeWidth: 2 },
                { title: 'Heavy Recoil', color: 'red', strokeWidth: 2 },
            ];
        }
        else {
            ITEMS = [
                { title: 'Light Recoil', color: 'blue', strokeWidth: 2 },
            ];
        }

        return (
            <XYPlot
                width={width}
                height={height}
                {...{ x_domain, y_domain }}
            >
                {use_items && <DiscreteColorLegend orientation='horizontal' width={300} items={ITEMS} />}
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title={x_label} />
                <YAxis title={y_label} tickSize={0.5} />
                {isValid && <LineSeries {...lineSeriesPropsLight} />}
                {isValid && <LineSeries {...lineSeriesPropsHeavy} />}
            </XYPlot>
        );
    }
}