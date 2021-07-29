/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { Grid, List } from '@material-ui/core';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Avatar from '@material-ui/core/Avatar';
import Item from '../atoms/DndIngredientsItem';
import muiTheme from '../theme';

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    flexGrow: 0,
    padding: theme.spacing(2, 1),
    border: `1px solid #ccc`,
    borderRadius: 4,
    margin: theme.spacing(1, 0),
  },
  oposit: {
    width: 0,
    display: 'none',
  },
  numAvatar: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    fontSize: '.9rem',
  },
  direction: {
    paddingTop: theme.spacing(1),
  },
  timelineContent: {
    margin: 0,
    paddingRight: 0,
  },
}));

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging && muiTheme.palette.primary.light,

  // styles we need to apply on draggables
  // ...draggableStyle,
});

const DndIngredientsList = React.memo((props) => {
  const { instructionId, instruction, ingredients } = props;
  const classes = useStyles();
  const shouldComponentUpdate = (nextProps) => {
    return props.items !== nextProps.items;
  };

  return (
    <Draggable draggableId={instructionId} index={props.index}>
      {(provided, snapshot) => (
        <RootRef rootRef={provided.innerRef}>
          <TimelineItem
            key={instructionId}
            {...provided.draggableProps}
            ContainerProps={{ ref: provided.innerRef }}
            {...provided.dragHandleProps}
          >
            <TimelineOppositeContent className={classes.oposit} />
            <TimelineSeparator>
              <TimelineDot
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <Avatar
                  className={classes.numAvatar}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {props.index + 1}
                </Avatar>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className={classes.timelineContent}>
              <Grid
                container
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
                className={classes.gridRoot}
              >
                <Grid item xs={12} md={7}>
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
                <Grid item xs={12} md={5}>
                  {instruction.direction}
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
        </RootRef>
      )}
    </Draggable>
  );
});

export default DndIngredientsList;
