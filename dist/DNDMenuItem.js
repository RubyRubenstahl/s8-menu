"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDnd = require("react-dnd");

var _MenuItem = require("./MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Mike on 1/3/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var dropTarget = {
  drop: function drop(props, monitor) {
    if (monitor.didDrop()) return;
    if ((0, _lodash2.default)(props.onDropped)) {
      var type = monitor.getItemType();
      var item = monitor.getItem();
      var payload = void 0;

      switch (type) {
        case _reactDndHtml5Backend.NativeTypes.FILE:
          payload = item.files;
          break;
        case _reactDndHtml5Backend.NativeTypes.TEXT:
          payload = item.text;
          break;
        case _reactDndHtml5Backend.NativeTypes.URL:
          payload = item.urls;
          break;
        default:
          payload = item.payload;
          break;
      }

      var dropResult = monitor.getDropResult();
      props.onDropped({ payload: payload, type: type, dropResult: dropResult });
    }
  }
};

var DNDMenuItem = function (_Component) {
  _inherits(DNDMenuItem, _Component);

  function DNDMenuItem(props) {
    _classCallCheck(this, DNDMenuItem);

    var _this = _possibleConstructorReturn(this, (DNDMenuItem.__proto__ || Object.getPrototypeOf(DNDMenuItem)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(DNDMenuItem, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          connectDropTarget = _props.connectDropTarget,
          connectDragSource = _props.connectDragSource,
          isOver = _props.isOver;

      return connectDropTarget(connectDragSource(_react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_MenuItem2.default, this.props)
      )));
    }
  }]);

  return DNDMenuItem;
}(_react.Component);

DNDMenuItem.propTypes = {
  icon: _propTypes2.default.object,
  openIcon: _propTypes2.default.object,
  backgroundColor: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  onItemClick: _propTypes2.default.func,
  onIconClick: _propTypes2.default.func,
  dragType: _propTypes2.default.string,
  dropTypes: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  onDropped: _propTypes2.default.func,
  extra: _propTypes2.default.element,
  render: _propTypes2.default.func

};

var dragSpec = {
  beginDrag: function beginDrag(props, monitor) {
    return props;
  },
  isDragging: function isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:

    return monitor.getItem().payload === props.payload;
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

var Draggable = (0, _reactDnd.DragSource)(function (_ref) {
  var _ref$dragType = _ref.dragType,
      dragType = _ref$dragType === undefined ? "none" : _ref$dragType;
  return dragType;
}, dragSpec, collect)(DNDMenuItem);

var Droppable = (0, _reactDnd.DropTarget)(function (_ref2) {
  var _ref2$dropTypes = _ref2.dropTypes,
      dropTypes = _ref2$dropTypes === undefined ? [] : _ref2$dropTypes;
  return dropTypes;
}, dropTarget, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
})(Draggable);

exports.default = Droppable;