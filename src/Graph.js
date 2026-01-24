import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './Graph.scss';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 600
    };
  }

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
    } = this.state;

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

  // Convert data format and handle loops
  convertData = (data_light, data_heavy) => {
    // For data with loops, we need to keep them as separate arrays
    // and render them as separate lines
    const lightData = [];
    const heavyData = [];
    
    if (data_light && Array.isArray(data_light)) {
      data_light.forEach(point => {
        if (point && point.x !== undefined && point.y !== undefined) {
          lightData.push({ angle: point.x, lightRecoil: point.y });
        }
      });
    }
    
    if (data_heavy && Array.isArray(data_heavy)) {
      data_heavy.forEach(point => {
        if (point && point.x !== undefined && point.y !== undefined) {
          heavyData.push({ angle: point.x, heavyRecoil: point.y });
        }
      });
    }
    
    return { lightData, heavyData };
  };

  render() {
    const {
      data_light,
      data_heavy,
      x_label,
      y_label,
      isValid,
      width,
      height,
      use_items,
      use_heavy_item,
    } = this.props;

    if (!isValid) {
      return (
        <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>No data available</p>
        </div>
      );
    }

    const { lightData, heavyData } = this.convertData(data_light, data_heavy);
    
    // Merge all unique angles for the x-axis domain
    const allAngles = new Set();
    lightData.forEach(d => allAngles.add(d.angle));
    heavyData.forEach(d => allAngles.add(d.angle));
    const sortedAngles = Array.from(allAngles).sort((a, b) => a - b);
    
    // Create combined data for chart axis
    const chartData = sortedAngles.map(angle => ({ angle }));

    return (
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="angle" 
            label={{ value: x_label, position: 'insideBottom', offset: -5 }}
            domain={[0, 'auto']}
            type="number"
          />
          <YAxis 
            label={{ value: y_label, angle: -90, position: 'insideLeft' }}
            domain={[0, 'auto']}
          />
          {use_items && <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />}
          <Line
            data={lightData}
            type="monotone"
            dataKey="lightRecoil"
            stroke="blue"
            strokeWidth={2}
            dot={false}
            name="Light Recoil"
            isAnimationActive={false}
            connectNulls={false}
          />
          {use_heavy_item && (
            <Line
              data={heavyData}
              type="monotone"
              dataKey="heavyRecoil"
              stroke="red"
              strokeWidth={2}
              dot={false}
              name="Heavy Recoil"
              isAnimationActive={false}
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}