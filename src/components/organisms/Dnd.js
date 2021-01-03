/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container } from '@material-ui/core';
import RootRef from '@material-ui/core/RootRef';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import DndInstructionList from '../molecules/DndInstructionList';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
}));

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const initialState = {
  ingredients: {
    1: getItems(1),
    2: getItems(1, 1),
    3: getItems(1, 2),
    4: getItems(1, 3),
    5: getItems(1, 4),
    6: getItems(1, 5),
  },
  instructions: {
    'inst-1': {
      order: 1,
      id: 1,
      direction: '粉類を泡立て器で混ぜる',
      ingIds: [1, 2],
    },
    'inst-2': {
      id: 2,
      direction: '溶いた卵と砂糖を加えてさらに混ぜる',
      order: 2,
      ingIds: [3, 4, 5],
    },
    'inst-3': {
      ingIds: [],
      id: 3,
      direction:
        '溶かしたバター、はちみつ、牛乳を加え、ゴムベラでさっくり混ぜる',
      order: 3,
    },
    'inst-4': {
      order: 4,
      ingIds: [6],
      id: 4,
      direction: '熱した型に生地を入れて焼く',
    },
  },
  instructionsOrder: ['inst-1', 'inst-2', 'inst-3', 'inst-4'],
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const Dnd = () => {
  const [state, setState] = useState(initialState);
  const classes = useStyles();
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  const id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };

  const getList = (id) => state[id2List[id]];

  const onDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'instruction') {
      const newInstructionsOrder = [...state.instructionsOrder];
      newInstructionsOrder.splice(source.index, 1);
      newInstructionsOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...state,
        instructionsOrder: newInstructionsOrder,
      };
      setState(newState);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const newOrder = reorder(
        state.instructions[source.droppableId].ingIds,
        source.index,
        destination.index
      );
      const newState = { ...state };
      newState.instructions[source.droppableId].ingIds = newOrder;
      setState(newState);
    } else {
      const newResult = move(
        state.instructions[source.droppableId].ingIds,
        state.instructions[destination.droppableId].ingIds,
        source,
        destination
      );
      const newState = { ...state };
      newState.instructions[source.droppableId].ingIds =
        newResult[source.droppableId];
      newState.instructions[destination.droppableId].ingIds =
        newResult[destination.droppableId];
      setState(newState);
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-instructions" type="instruction">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Timeline className={classes.root}>
              {state.instructionsOrder.map((instId, index) => {
                const instruction = state.instructions[instId];
                const ingredients = instruction.ingIds.map(
                  (ingId) => state.ingredients[ingId]
                );
                return (
                  <DndInstructionList
                    key={instruction.id}
                    instruction={instruction}
                    instructionId={instId}
                    ingredients={ingredients}
                    index={index}
                  />
                );
              })}
            </Timeline>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dnd;
