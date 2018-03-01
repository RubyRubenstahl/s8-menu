"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = exports.IconContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  padding: 8px;\n  display: inline-block;\n  ", ";\n"], ["\n  padding: 8px;\n  display: inline-block;\n  ", ";\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  flex-grow: 1;\n  display: flex;\n"], ["\n  color: ", ";\n  flex-grow: 1;\n  display: flex;\n"]),
    _templateObject3 = _taggedTemplateLiteral([""], [""]),
    _templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  transition: all 0.2s ease-in-out;\n  outline: ", ";\n  outline-offset: -2pt;\n  ", ";\n"], ["\n  display: flex;\n  align-items: center;\n  transition: all 0.2s ease-in-out;\n  outline: ", ";\n  outline-offset: -2pt;\n  ", ";\n"]),
    _templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"]),
    _templateObject6 = _taggedTemplateLiteral(["\n  padding-left: 8pt;\n"], ["\n  padding-left: 8pt;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _Menu = require("./Menu");

var _Menu2 = _interopRequireDefault(_Menu);

var _reactCollapse = require("react-collapse");

var _reactCollapse2 = _interopRequireDefault(_reactCollapse);

var _lodash3 = require("lodash.get");

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /**
                                                                                                                                                   * Created by Mike on 1/3/2017.
                                                                                                                                                   */


var defaultIcon = function defaultIcon() {
  return _react2.default.createElement(
    "span",
    null,
    "\u23F5"
  );
};
var defaultOpenIcon = function defaultOpenIcon() {
  return _react2.default.createElement(
    "span",
    null,
    "\u23F7"
  );
};

var IconContainer = exports.IconContainer = _styledComponents2.default.span(_templateObject, function (props) {
  return props.expandable && "cursor: pointer;";
});

var Title = exports.Title = _styledComponents2.default.span(_templateObject2, function (props) {
  return props.textColor ? props.textColor : "inherit";
});

var ExtraComponents = _styledComponents2.default.span(_templateObject3);

var Label = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.isOver ? "2px dashed lightblue" : "2px dashed #FFFFFF00";
}, function (props) {
  return props.backgroundColor ? "background-color: " + props.backgroundColor : "background-color: rgba(0,0,0,0);\n      &:hover {\n      background-color: rgba(0,0,0,.03);\n      }";
});

var MenuItemContainer = _styledComponents2.default.li(_templateObject5);

var IndentedMenu = (0, _styledComponents2.default)(_Menu2.default)(_templateObject6);

var MenuItem = function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

    _this.state = { open: props.initiallyOpen };

    _this.handleIconClick = _this.handleIconClick.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(MenuItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var oldChildren = (0, _lodash4.default)(this, 'props.children') || [];
      var newChildren = (0, _lodash4.default)(nextProps, 'children') || [];

      if (oldChildren && oldChildren.length !== newChildren.length) return true;
      if (this.state.open !== nextState.open) return true;
      if (this.props.isOver !== nextProps.isOver) return true;

      return false;
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if ((0, _lodash2.default)(this.props.onItemClick)) {
        this.props.onItemClick(e);
        e.preventDefault();
      }
    }
  }, {
    key: "handleIconClick",
    value: function handleIconClick() {
      if ((0, _lodash2.default)(this.props.onIconClick)) {
        this.props.onIconClick();
      }
      this.setState({ open: !this.state.open });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          render = _props.render,
          rest = _objectWithoutProperties(_props, ["render"]);

      if ((0, _lodash2.default)(render)) {
        return render(rest);
      }

      var _props2 = this.props,
          title = _props2.title,
          children = _props2.children,
          isOver = _props2.isOver,
          textColor = _props2.textColor,
          extra = _props2.extra;
      var open = this.state.open;


      var hasChildren = children !== undefined;

      var _props3 = this.props,
          icon = _props3.icon,
          openIcon = _props3.openIcon;

      if (hasChildren && icon === undefined) {
        icon = defaultIcon();
        openIcon = defaultOpenIcon();
      }

      var hasOpenIcon = openIcon !== undefined;
      var showOpenIcon = open && hasOpenIcon;

      return _react2.default.createElement(
        MenuItemContainer,
        this.props,
        _react2.default.createElement(
          Label,
          this.props,
          _react2.default.createElement(
            IconContainer,
            _extends({
              expandable: hasChildren,
              onClick: this.handleIconClick,
              onTouchState: this.handleIconClick
            }, this.props),
            _react2.default.createElement(
              "span",
              { style: { display: showOpenIcon ? "none" : "inline-block" } },
              icon
            ),
            _react2.default.createElement(
              "span",
              { style: { display: showOpenIcon ? "inline-block" : "none" } },
              openIcon
            )
          ),
          _react2.default.createElement(
            Title,
            _extends({}, this.props, { onClick: this.handleClick }),
            title
          ),
          extra && _react2.default.createElement(
            ExtraComponents,
            null,
            extra
          )
        ),
        _react2.default.createElement(
          _reactCollapse2.default,
          {
            isOpened: Boolean(open),
            springConfig: { stiffness: 203, damping: 29 }
          },
          _react2.default.createElement(
            IndentedMenu,
            null,
            children
          )
        )
      );
    }
  }]);

  return MenuItem;
}(_react.Component);

MenuItem.propTypes = {
  icon: _propTypes2.default.object,
  openIcon: _propTypes2.default.object,
  backgroundColor: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  onItemClick: _propTypes2.default.func,
  onIconClick: _propTypes2.default.func,
  extra: _propTypes2.default.element,
  render: _propTypes2.default.func
};

exports.default = MenuItem;