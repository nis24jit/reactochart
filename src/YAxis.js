import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {getTickDomain} from './utils/Scale';
import {sumMargins} from './utils/Margin';
import {getAxisChildProps} from './utils/Axis'
import xyPropsEqual from './utils/xyPropsEqual';


import YTicks from './YTicks';
import YGrid from './YGrid';
import YAxisLabels from './YAxisLabels';
import YAxisTitle from './YAxisTitle';

export default class YAxis extends React.Component {
  static propTypes = {
    scale: PropTypes.shape({y: PropTypes.func.isRequired}),

    width: PropTypes.number,
    height: PropTypes.number,
    position: PropTypes.string,
    placement: PropTypes.string,
    nice: PropTypes.bool,
    ticks: PropTypes.array,
    tickCount: PropTypes.number,

    showTitle: PropTypes.bool,
    showLabels: PropTypes.bool,
    showTicks: PropTypes.bool,
    showGrid: PropTypes.bool,

    title: PropTypes.string,
    titleDistance: PropTypes.number,
    titleAlign: PropTypes.string,
    titleRotate: PropTypes.bool,
    titleStyle: PropTypes.object,

    labelDistance: PropTypes.number,
    labelClassName: PropTypes.string,
    labelStyle: PropTypes.object,
    labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    labelFormats: PropTypes.array,
    labels: PropTypes.array,

    tickLength: PropTypes.number,
    tickClassName: PropTypes.string,
    tickStyle: PropTypes.object,

    gridLineClassName: PropTypes.string,
    gridLineStyle: PropTypes.object,

    onMouseEnterLabel: PropTypes.func,
    onMouseMoveLabel: PropTypes.func,
    onMouseLeaveLabel: PropTypes.func
  };

  static defaultProps = {
    width: 400,
    height: 250,
    position: 'left',
    nice: true,
    showTitle: true,
    showLabels: true,
    showTicks: true,
    showGrid: true,
    tickLength: 5,
    labelDistance: 3,
    titleDistance: 5,
    spacing: {top: 0, bottom: 0, left: 0, right: 0}
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !xyPropsEqual(this.props, nextProps);
  }

  static getTickDomain(props) {
    if(!_.get(props, 'scale.y')) return;
    props = _.defaults({}, props, YAxis.defaultProps);
    return {y: getTickDomain(props.scale.y, props)};
  }

  static getMargin(props) {
    // todo figure out margin if labels change after margin?
    const {ticksProps, labelsProps, titleProps} = getAxisChildProps(props);
    let margins = [];

    if(props.showTicks)
      margins.push(YTicks.getMargin(ticksProps));

    if(props.showTitle && props.title)
      margins.push(YAxisTitle.getMargin(titleProps));

    if(props.showLabels)
      margins.push(YAxisLabels.getMargin(labelsProps));

    return sumMargins(margins);
  }

  render() {
    const {
      width, height, position, spacing, tickLength, titleDistance, labelDistance,
      showTitle, showLabels, showTicks, showGrid
    } = this.props;

    const {ticksProps, gridProps, labelsProps, titleProps} = getAxisChildProps(this.props);

    labelsProps.distance = labelDistance + (showTicks ? tickLength : 0);

    if(showTitle && showLabels) {
      // todo optimize so we don't generate labels twice
      const labelsMargin = YAxisLabels.getMargin(labelsProps);
      titleProps.distance = titleDistance + labelsMargin[position];
    } else if(showTitle && showTicks) {
      titleProps.distance = titleDistance + tickLength;
    }

    const axisLineX = (position === 'left') ? -spacing.left : width + spacing.right;
    // `height` is height of inner chart *not* including spacing - add spacing to figure out where to draw axis line
    const axisLineHeight = height + spacing.top + spacing.bottom;

    return <g className="chart-axis chart-axis-y">
      {showGrid ? <YGrid {...gridProps} /> : null}

      {showTicks ? <YTicks {...ticksProps}/> : null}

      {showLabels ? <YAxisLabels {...labelsProps} /> : null}

      {showTitle ? <YAxisTitle {...titleProps} /> : null}

      <line
        className="chart-axis-line chart-axis-line-y"
        x1={axisLineX} x2={axisLineX}
        y1={-spacing.top} y2={height + spacing.bottom}
      />
    </g>;
  }
}
