'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _util = require('./util');

var _Scale = require('./utils/Scale');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Bar is a low-level component to be used in XYPlot-type charts (namely BarChart).
 * It is specified in terms of a range (min & max) of values on one axis (the bar's long axis)
 * and a single value on the other axis.
 * Passing props `xValue`, `xEndValue` and `yValue` specifies a horizontal bar,
 * centered on `yValue` and spanning from `xValue` to `xEndValue`;
 * passing props `xValue`, `yValue`, and `yEndValue' specifies a vertical bar.
 */

var Bar = function (_React$Component) {
  _inherits(Bar, _React$Component);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
  }

  _createClass(Bar, [{
    key: 'render',
    value: function render() {
      //  x/yValue are values in the *data* domain, not pixel domain
      var _props = this.props,
          scale = _props.scale,
          xValue = _props.xValue,
          xEndValue = _props.xEndValue,
          yValue = _props.yValue,
          yEndValue = _props.yEndValue,
          thickness = _props.thickness,
          style = _props.style,
          onMouseEnter = _props.onMouseEnter,
          onMouseMove = _props.onMouseMove,
          onMouseLeave = _props.onMouseLeave;
      // console.log('bar', this.props);

      (0, _invariant2.default)((0, _Scale.hasXYScales)(this.props.scale), 'Bar.props.scale.x and scale.y must both be valid d3 scales');
      (0, _invariant2.default)((0, _util.hasOneOfTwo)(xEndValue, yEndValue), 'Bar expects an xEnd *or* yEnd prop, but not both.');

      var orientation = (0, _isUndefined2.default)(xEndValue) ? 'vertical' : 'horizontal';
      var className = 'chart-bar chart-bar-' + orientation + ' ' + (this.props.className || '');

      var x = void 0,
          y = void 0,
          width = void 0,
          height = void 0;
      if (orientation === 'horizontal') {
        y = scale.y(yValue) - thickness / 2;
        var x0 = scale.x(xValue);
        var x1 = scale.x(xEndValue);
        x = Math.min(x0, x1);
        width = Math.abs(x1 - x0);
        height = thickness;
      } else {
        // vertical
        x = scale.x(xValue) - thickness / 2;
        var y0 = scale.y(yValue);
        var y1 = scale.y(yEndValue);
        y = Math.min(y0, y1);
        height = Math.abs(y1 - y0);
        width = thickness;
      }

      return _react2.default.createElement('rect', {
        x: x, y: y, width: width, height: height,
        className: className, style: style,
        onMouseEnter: onMouseEnter, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave
      });
    }
  }]);

  return Bar;
}(_react2.default.Component);

Bar.propTypes = {
  /**
   * D3 scales for the X and Y axes of the chart, in {x, y} object format.
   */
  scale: _propTypes2.default.shape({ x: _propTypes2.default.func.isRequired, y: _propTypes2.default.func.isRequired }),
  /**
   * For a vertical bar, xValue represents the X data value on which the bar is centered.
   * For a horizontal bar, represents the *starting* X data value of the bar, ie. the minimum of the range it spans
   */
  xValue: _propTypes2.default.any,
  /**
   * For a horizontal bar, yValue represents the Y data value on which the bar is centered.
   * For a vertical bar, represents the *starting* Y data value of the bar, ie. the minimum of the range it spans
   */
  yValue: _propTypes2.default.any,
  /**
   * For a horizontal bar, represents the *ending* X data value of the bar, ie. the maximum of the range it spans.
   * Should be undefined if the bar is vertical.
   */
  xEndValue: _propTypes2.default.any,
  /**
   * For a vertical bar, represents the *ending* Y data value of the bar, ie. the maximum of the range it spans.
   * Should be undefined if the bar is horizontal.
   */
  yEndValue: _propTypes2.default.any,
  /**
   * The thickness of the bar, in pixels. (width of vertical bar, or height of horizontal bar)
   */
  thickness: _propTypes2.default.number,
  /**
   * Class name(s) to be included on the bar's <rect> element
   */
  className: _propTypes2.default.string,
  /**
   * Inline style object to be included on the bar's <rect> element
   */
  style: _propTypes2.default.object,
  /**
   * onMouseMove event handler callback, called when user's mouse moves within the bar.
   */
  onMouseMove: _propTypes2.default.func,
  /**
   * onMouseEnter event handler callback, called when user's mouse enters the bar.
   */
  onMouseEnter: _propTypes2.default.func,
  /**
   * onMouseLeave event handler callback, called when user's mouse leaves the bar.
   */
  onMouseLeave: _propTypes2.default.func
};
Bar.defaultProps = {
  xValue: 0,
  yValue: 0,
  thickness: 8,
  className: '',
  style: {}
};
exports.default = Bar;
//# sourceMappingURL=Bar.js.map