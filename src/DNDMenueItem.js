/**
 * Created by Mike on 1/3/2017.
 */
import React, {Component} from 'react';
import propTypes from 'prop-types';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';
import MenuItem from './MenuItem';
import isFunction from 'lodash.isfunction';

const fileTarget = {
  drop(props, monitor) {

    if(isFunction(props.onDrop)){
      props.onDrop(props, monitor);
    }

  }
};




class DNDMenueItem extends Component{
  constructor(props){
    super(props);
    this.state = {};

  }

  render(){
    const {connectDropTarget, isOver} = this.props;
    console.log(isOver)
    return connectDropTarget(
        <div><MenuItem {...this.props}/></div>
    )
  }
};

DNDMenueItem.propTypes = {

};



  export default DropTarget(({dropTypes=[]})=>dropTypes, fileTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }))(DNDMenueItem)

