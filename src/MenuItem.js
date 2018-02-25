/**
 * Created by Mike on 1/3/2017.
 */
import React, {Component} from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import isFunction from 'lodash.isfunction';
import Menu from "./Menu";
import Collapse from 'react-collapse';
import {presets} from 'react-motion';

const IconContainer = styled.span`
  padding: 8px;
  display: inline-block;
  color: ${props=>props.iconColor ? props.iconColor: 'inherit'};
  ${props=> props.expandable && 'cursor: pointer;'}
`;

const Title = styled.span`
  color: ${props=>props.textColor ? props.textColor: 'inherit'};
  flex-grow: 1;
`;


const Label = styled.div`
  display: flex;
  align-items: center;
  transition: all .2s ease-in-out;
  outline: ${props => props.isOver ? '2px dashed lightblue' : '2px dashed #FFFFFF00'};
  outline-offset: -2pt;
  ${props=>props.backgroundColor ? 
      `background-color: ${props.backgroundColor}` : 
      `background-color: rgba(0,0,0,0);
      &:hover {
      background-color: rgba(0,0,0,.03);
      }`
  }
`;

const MenuItemContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

class MenuItem extends Component{
  constructor(props){
    super(props);

    this.state = {open: props.initiallyOpen};

    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.open !== nextState.open) return true;
    if(this.props.isOver !== nextProps.isOver) return true;
    return true;
  }

  handleClick(e){
    if(isFunction(this.props.onItemClick)){
      this.props.onItemClick(e);
      e.preventDefault();
    }
  }

  handleIconClick(){
    if(isFunction(this.props.onIconClick)){
      this.props.onIconClick();
    }
    this.setState({open: !this.state.open});
  }

  render(){
    const {render, ...rest} = this.props;
    if(isFunction(render)){
      return render(rest);
    }

    const {title, children, icon, openIcon, isOver, textColor } = this.props;
    const {open} = this.state;


    // TODO: Fix open folder display
    // TODO: Fix reveal springyness
    const hasChildren = children && children.length > 0;
    const hasOpenIcon = openIcon !== undefined;
    const showOpenIcon = open && hasOpenIcon;
    const labelIcon =  showOpenIcon ? openIcon : icon;
    console.log('CanDrop: ' + this.props.canDrop)
    return (
      <MenuItemContainer {...this.props}>
        <Label  {...this.props}>

        <IconContainer
            expandable={hasChildren}
            onClick={this.handleIconClick}
            onTouchState={this.handleIconClick}
            {...this.props}
        >
          {labelIcon}
        </IconContainer>

        <Title {...this.props} onClick={this.handleClick} >{title}</Title>
        </Label>

        <Collapse isOpened={Boolean(open)} springConfig={{stiffness:203, damping:29}}>
          <Menu >{children}</Menu>
        </Collapse>
      </MenuItemContainer>
    )
  }
};

MenuItem.propTypes = {

};

export default MenuItem;



