/**
 * Created by Mike on 1/3/2017.
 */
import React, { Component } from "react";
import propTypes from "prop-types";
import { NativeTypes } from "react-dnd-html5-backend";
import { DropTarget, DragSource } from "react-dnd";
import MenuItem from "./MenuItem";
import isFunction from "lodash.isfunction";

const dropTarget = {
  drop(props, monitor) {
    if (isFunction(props.onDropped)) {
      const type = monitor.getItemType();
      const item = monitor.getItem();
      let payload;

      switch (type) {
        case NativeTypes.FILE:
          payload = item.files;
          break;
        case NativeTypes.TEXT:
          payload = item.text;
          break;
        case NativeTypes.URL:
          payload = item.urls;
          break;
        default:
          payload = item.payload;
          break;
      }

      const dropResult = monitor.getDropResult();
      props.onDropped({ payload, type, dropResult });
    }
  }
};

class DNDMenueItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div>
          <MenuItem {...this.props} />
        </div>
      )
    );
  }
}

DNDMenueItem.propTypes = {
  icon: propTypes.object,
  openIcon: propTypes.object,
  backgroundColor: propTypes.string,
  textColor: propTypes.string,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
  onItemClick: propTypes.func,
  onIconClick: propTypes.func,
  dragType: propTypes.string,
  dropTypes: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string)
  ]),
  onDropped: propTypes.func
};

const dragSpec = {
  beginDrag(props, monitor) {
    return props;
  },
  isDragging(props, monitor) {
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

const Draggable = DragSource(
  ({ dragType = "none" }) => dragType,
  dragSpec,
  collect
)(DNDMenueItem);

const Droppable = DropTarget(
  ({ dropTypes = [] }) => dropTypes,
  dropTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  })
)(Draggable);

export default Droppable;
