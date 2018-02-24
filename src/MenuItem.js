/**
 * Created by Mike on 1/3/2017.
 */
import React, {Component} from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import isFunction from 'lodash.isfunction';
import Menu from "./Menu";
import Collapse from 'react-collapse';

const IconContainer = styled.span`
  padding: 8px;
  display: inline-block;
  ${props=> props.expandable && 'cursor: pointer;'}
`;

const Title = styled.span`
  flex-grow: 1;
`;


const Label = styled.div`
  display: flex;
  align-items: center;
`

const MenuItemContainer = styled.li`
  display: flex;
  flex-direction: column;
`;

class MenuItem extends Component{
  constructor(props){
    super(props);

    this.state = {open: props.initiallyOpen};

    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick(){
    if(isFunction(this.props.onClick)){
      this.props.onClick();
    }
    this.setState({open: !this.state.open});
  }

  render(){
    const {title, children, icon, openIcon, open} = this.props;
    const hasChildren = children && children.length > 0;

    const isOpen = open === undefined ? this.state.open : open;
    const labelIcon = open && openIcon !==undefined ? openIcon : icon;

    return (
      <MenuItemContainer>
        <Label>
        {icon &&
            <IconContainer
                expandable={hasChildren}
                onClick={this.handleIconClick}
                onTouchState={this.handleIconClick}
            >
              {icon}
            </IconContainer>
        }
        <Title>{title}</Title>
        </Label>

        <Collapse isOpened={isOpen}>
          <Menu >{children}</Menu>
        </Collapse>
      </MenuItemContainer>
    )
  }
};

MenuItem.propTypes = {

};

export default MenuItem;



