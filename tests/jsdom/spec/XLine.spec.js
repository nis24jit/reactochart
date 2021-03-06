import _ from 'lodash';
import * as d3 from 'd3';
import React from 'react';
import {shallow, mount} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai from 'chai';
chai.use(chaiEnzyme());
const {expect} = chai;

import XLine from '../../../src/XLine';

function findLine(wrapper) {
  return wrapper.find('line.chart-line-x').first();
}

function expectCorrectLinePlacement(wrapper, value, scale) {
  const lines = wrapper.find('line.chart-line-x');
  expect(lines).to.have.length(1);
  const line = lines.first();
  expect(line.first().prop('x1')).to.equal(scale(value));
  expect(line.first().prop('x2')).to.equal(scale(value));
  return wrapper;
}

function getLineHeight(line) {
  const y1 = +line.prop('y1') || 0;
  const y2 = +line.prop('y2');
  return Math.abs(y2 - y1);
}

describe('XLine', () => {
  const linearScale = d3.scaleLinear().domain([-5, 5]).range([0, 500]);
  const timeScale = d3.scaleTime().domain([new Date(2009, 0, 1), new Date(2010, 0, 1)]).range([0, 500]);
  const ordinalScale = d3.scalePoint().domain(['a', 'b', 'c', 'd']).range([0, 300]);

  const linearValue = 2;
  const timeValue = new Date(2009, 9, 19);
  const ordinalValue = 'c';
  const commonProps = {spacing: {top: 0, bottom: 0, left: 0, right: 0}};

  it('renders a .chart-line-x element in the correct place', () => {
    let wrapper = shallow(<XLine scale={{x: linearScale}} value={linearValue} {...commonProps} />);
    expectCorrectLinePlacement(wrapper, linearValue, linearScale);

    wrapper = shallow(<XLine scale={{x: timeScale}} value={timeValue} {...commonProps} />);
    expectCorrectLinePlacement(wrapper, timeValue, timeScale);

    wrapper = shallow(<XLine scale={{x: ordinalScale}} value={ordinalValue} {...commonProps} />);
    expectCorrectLinePlacement(wrapper, ordinalValue, ordinalScale);
  });

  it('renders a line with the correct height', () => {
    let wrapper = shallow(<XLine scale={{x: linearScale}} value={linearValue} height={200} {...commonProps} />);
    expect(getLineHeight(findLine(wrapper))).to.equal(200);

    wrapper = shallow(<XLine scale={{x: linearScale}} value={linearValue} height={400} {...commonProps} />);
    expect(getLineHeight(findLine(wrapper))).to.equal(400);
  });

  it('passes className to the line', () => {
    let wrapper = shallow(<XLine scale={{x: linearScale}} value={linearValue} className={'test-line-class'} {...commonProps} />);
    expect(wrapper).to.have.descendants('line.test-line-class');
  });

  it('passes style to the line', () => {
    const style = {fill: 'red'};
    let wrapper = shallow(<XLine scale={{x: linearScale}} value={linearValue} style={style} {...commonProps} />);
    expect(findLine(wrapper).prop('style')).to.deep.equal(style);
  });
});
