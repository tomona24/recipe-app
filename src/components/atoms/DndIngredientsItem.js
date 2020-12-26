/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import EditIcon from '@material-ui/icons/Edit';
import muiTheme from '../theme';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  height: `50px`,

  // change background colour if dragging
  background: isDragging ? muiTheme.palette.secondary.main : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const DndIngredientsItem = (props) => {
  const { item, index } = props;
  const shouldComponentUpdate = (nextProps) => {
    return props.items !== nextProps.items;
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ContainerComponent="li"
          ContainerProps={{ ref: provided.innerRef }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <ListItemText primary={item.content} />
          <ListItemSecondaryAction />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DndIngredientsItem;
