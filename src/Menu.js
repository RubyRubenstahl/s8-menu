/**
 * Created by Mike on 1/3/2017.
 */
import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const MenuContainer = styled.ul`
  font-size: 12pt;
  display: flex;
  padding-left: 12pt;
  overflow: hidden;
  flex-direction: column;
  cursor: default;
  user-select: none;
  ${props => props.css && props.css};
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
