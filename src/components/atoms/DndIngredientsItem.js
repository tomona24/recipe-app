/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import InboxIcon from '@material-ui/icons/Inbox';
import EditIcon from '@material-ui/icons/Edit';
import muiTheme from '../theme';

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? muiTheme.palette.primary.light : 'lightgrey',
  padding: 8,
  width: 250,
});

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

const InnerIngredientsList = React.memo((props) => {
  const { ingredients } = props;
  return ingredients.map((item, index) => {
    const ingItem = item[0];
    return (
      <Draggable key={ingItem.id} draggableId={ingItem.id} index={index}>
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
            <ListItemText primary={ingItem.content} />
            <ListItemSecondaryAction />
          </ListItem>
        )}
      </Draggable>
    );
  });
});

const DndIngredientsItem = (props) => {
  const { instProvided, ingredients, instSnapshot } = props;
  return (
    <RootRef rootRef={instProvided.innerRef}>
      <List
        {...instProvided.droppableProps}
        style={getListStyle(instSnapshot.isDraggingOver)}
      >
        <InnerIngredientsList ingredients={ingredients} />
        {instProvided.placeholder}
      </List>
    </RootRef>
  );
};

export default DndIngredientsItem;

// <Draggable key={item.id} draggableId={item.id} index={index}>
// {(provided, snapshot) => (
//   <ListItem
//     ContainerComponent="li"
//     ContainerProps={{ ref: provided.innerRef }}
//     {...provided.draggableProps}
//     {...provided.dragHandleProps}
//     style={getItemStyle(
//       snapshot.isDragging,
//       provided.draggableProps.style
//     )}
//   >
//     <ListItemText primary={item.content} />
//     <ListItemSecondaryAction />
//   </ListItem>
// )}
// </Draggable>
