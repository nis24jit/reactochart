'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d = require('d3');

var _shallowEqual = require('./utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Data = require('./utils/Data');

var _xyPropsEqual = require('./utils/xyPropsEqual');

var _xyPropsEqual2 = _interopRequireDefault(_xyPropsEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {xyPropsEqualDebug as xyPropsEqual} from './utils/xyPropsEqual';


var LineChart = function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LineChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call.apply(_ref, [this].concat(args))), _this), _this.getHovered = function (x, y) {
      var closestDataIndex = _this.state.bisectX(_this.props.data, x);
      return _this.props.data[closestDataIndex];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LineChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initBisector(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.initBisector(nextProps);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _xyPropsEqual2.default)(this.props, nextProps, ['lineStyle']);
    }
  }, {
    key: 'initBisector',
    value: function initBisector(props) {
      this.setState({ bisectX: (0, _d.bisector)(function (d) {
          return (0, _Data.makeAccessor)(props.getX)(d);
        }).left });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          scale = _props.scale,
          getX = _props.getX,
          getY = _props.getY,
          lineStyle = _props.lineStyle;

      var accessors = { x: (0, _Data.makeAccessor)(getX), y: (0, _Data.makeAccessor)(getY) };
      var points = _lodash2.default.map(data, function (d) {
        return [scale.x(accessors.x(d)), scale.y(accessors.y(d))];
      });
      var pathStr = pointsToPathStr(points);

      return _react2.default.createElement(
        'g',
        { className: this.props.name },
        _react2.default.createElement('path', { d: pathStr, style: lineStyle })
      );
    }
  }]);

  return LineChart;
}(_react2.default.Component);

LineChart.propTypes = {
  /**
   * the array of data objects
   */
  data: _propTypes2.default.array.isRequired,
  /**
   * data getter for line X coordinates
   */
  getX: _propTypes2.default.any,
  /**
   * data getter for line Y coordinates
   */
  getY: _propTypes2.default.any,
  /**
   * inline style object to be applied to the line path
   */
  lineStyle: _propTypes2.default.object,
  /**
   * d3 scale - provided by XYPlot
   */
  scale: _propTypes2.default.object
};
LineChart.defaultProps = {
  lineStyle: {}
};
exports.default = LineChart;


function pointsToPathStr(points) {
  // takes array of points in [[x, y], [x, y]... ] format
  // returns SVG path string in "M X Y L X Y" format
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands
  return _lodash2.default.map(points, function (_ref2, i) {
    var _ref3 = _slicedToArray(_ref2, 2),
        x = _ref3[0],
        y = _ref3[1];

    var command = i === 0 ? 'M' : 'L';
    return command + ' ' + x + ' ' + y;
  }).join(' ');
}
//# sourceMappingURL=LineChart.js.map