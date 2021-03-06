/**
 * Created by Mike on 1/3/2017.
 */
import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import isFunction from "lodash.isfunction";
import Menu from "./Menu";
import Collapse from "react-collapse";
import get from 'lodash.get';
import Spinner from 'react-spinkit';
const defaultIcon = () => <span>&#x23F5;</span>;
const defaultOpenIcon = () => <span>&#x23F7;</span>;

export const IconContainer = styled.span`
  padding: 8px;
  display: inline-block;
  ${props => props.expandable && "cursor: pointer;"};
`;

export const Title = styled.span`
  color: ${props => (props.textColor ? props.textColor : "inherit")};
  flex-grow: 1;
  display: flex;
`;

const StyledSpinner = styled(Spinner)
  .attrs({
    name: 'circle',
    color: props => props.spinnerColor ? props.spinnerColor : 'darkgrey'
  })`
    max-width: 12pt;
    max-height: 12pt;
`

const ExtraComponents = styled.span``;

const Label = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  ${props =>
    !props.canDropStyle && (`
      outline: ${props.isOver ? "2px dashed lightblue" : "2px dashed #FFFFFF00"};}
      outline-offset: -2pt;
    `)}
  
  ${props =>
    props.backgroundColor
      ? `background-color: ${props.backgroundColor}`
      : `background-color: rgba(0,0,0,0);
      &:hover {
      background-color: rgba(0,0,0,.03);
      }`};
    ${props=> props.isOver && props.canDropStyle && props.canDropStyle}  

`;

const MenuItemContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

const IndentedMenu = styled(Menu)`
  padding-left: 8pt;
`;

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.initiallyOpen };

    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldChildren = get(this, 'props.children') || [];
    const newChildren = get(nextProps, 'children') || [];

    if (oldChildren && oldChildren.length !== newChildren.length) return true;
    if (this.state.open !== nextState.open) return true;
    if (this.props.isOver !== nextProps.isOver) return true;

    return true;
  }

  handleClick(e) {
    if (isFunction(this.props.onItemClick)) {
      this.props.onItemClick(e);
      e.preventDefault();
    }
  }

  handleIconClick() {
    if (isFunction(this.props.onIconClick)) {
      this.props.onIconClick();
    }
    if(this.props.expandable !== false) {
      this.setState({open: !this.state.open});
    }
  }

  render() {
    const { render, ...rest } = this.props;
    if (isFunction(render)) {
      return render(rest);
    }

    const { title, children, isOver, textColor, extra, expandable=true, loading } = this.props;
    const { open } = this.state;

    const hasChildren = children !== undefined;

    let { icon, openIcon } = this.props;
    if (hasChildren && icon === undefined) {
      icon = defaultIcon();
      openIcon = defaultOpenIcon();
    }


    icon = loading ? <StyledSpinner {...this.props}/> : icon;
    const hasOpenIcon = openIcon !== undefined;
    const showOpenIcon = open && hasOpenIcon && !loading;
    return (
      <MenuItemContainer {...this.props}>
        <Label {...this.props}>
          <IconContainer
            expandable={expandable && hasChildren}
            onClick={this.handleIconClick}
            onTouchState={this.handleIconClick}
            {...this.props}
          >
            <span style={{ display: showOpenIcon ? "none" : "inline-block" }}>
              {icon}
            </span>
            <span style={{ display: showOpenIcon ? "inline-block" : "none" }}>
              {openIcon}
            </span>
          </IconContainer>

          <Title {...this.props} onClick={this.handleClick}>
            {title}
          </Title>

          {
            extra && <ExtraComponents>{extra}</ExtraComponents>
          }
        </Label>

        <Collapse
          isOpened={Boolean(open)}
          springConfig={{ stiffness: 203, damping: 29 }}
        >
          <IndentedMenu>{children}</IndentedMenu>
        </Collapse>
      </MenuItemContainer>
    );
  }
}

MenuItem.propTypes = {
  icon: propTypes.object,
  openIcon: propTypes.object,
  backgroundColor: propTypes.string,
  textColor: propTypes.string,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  onItemClick: propTypes.func,
  onIconClick: propTypes.func,
  extra: propTypes.element,
  render: propTypes.func,
  expandable: propTypes.bool
};

export default MenuItem;


