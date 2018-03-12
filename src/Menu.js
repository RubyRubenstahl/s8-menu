/**
 * Created by Mike on 1/3/2017.
 */
import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const MenuContainer = styled.ul`
  font-size: 12pt;
  display: flex;
  padding-left: 0pt;
  overflow: hidden;
  flex-direction: column;
  cursor: default;
  user-select: none;
  ${props => props.css && props.css};
      
  > li > div:first-child {
        background-color: ${props => props.headerBackgroundColor ? props.headerBackgroundColor : 'inherit' };
        color: ${props => props.headerTextColor ? props.headerTextColor : 'inherit' };
        border-radius: inherit;
  }
`;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    return <MenuContainer {...this.props}>{this.props.children}</MenuContainer>;
  }
}

Menu.propTypes = {};

export default Menu;
