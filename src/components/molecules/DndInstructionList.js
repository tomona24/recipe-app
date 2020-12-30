/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { Grid, List } from '@material-ui/core';
import Item from '../atoms/DndIngredientsItem';
import muiTheme from '../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    padding: theme.spacing(2),
    border: `1px solid #ccc`,
    borderRadius: 4,
    margin: theme.spacing(1, 0),
  },
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `0 0 8px 0`,
  height: `50px`,

  // change background colour if dragging
  background: isDragging ? muiTheme.palette.secondary.main : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const DndIngredientsList = React.memo((props) => {
  const { instructionId, instruction, ingredients } = props;
  const classes = useStyles();
  const shouldComponentUpdate = (nextProps) => {
    return props.items !== nextProps.items;
  };

  return (
    <Draggable draggableId={instructionId} index={props.index}>
      {(provided) => (
        <RootRef rootRef={provided.innerRef}>
          <Grid
            container
            className={classes.root}
            {...provided.draggableProps}
            ContainerProps={{ ref: provided.innerRef }}
          >
            <Grid item>
              <Droppable droppableId={instructionId} type="ingredients">
                {(provided, snapshot) => (
                  <Item
                    ingredients={ingredients}
                    instProvided={provided}
                    instSnapshot={snapshot}
                  />
                )}
              </Droppable>
            </Grid>
            <Grid item {...provided.dragHandleProps}>
              {instruction.direction}
            </Grid>
          </Grid>
        </RootRef>
      )}
    </Draggable>
  );
});

export default DndIngredientsList;
