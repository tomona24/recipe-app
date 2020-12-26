/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import IngredientsList from '../atoms/DndIngredientsList';

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
    3: getItems(2, 1),
    4: getItems(3, 1),
    5: getItems(4, 1),
    // 6: getItems(5, 1),
  },
  instructions: {
    'inst-1': {
      order: 1,
      id: 1,
      direction: '粉類を泡立て器で混ぜる',
      ingredients: [1, 2],
    },
    'inst-2': {
      id: 2,
      direction: '溶いた卵と砂糖を加えてさらに混ぜる',
      order: 2,
      ingredients: [3, 4, 5],
    },
    // 3: {
    //   ingredients: [],
    //   id: 3,
    //   direction:
    //     '溶かしたバター、はちみつ、牛乳を加え、ゴムベラでさっくり混ぜる',
    //   order: 3,
    // },
    // 4: {
    //   order: 4,
    //   ingredients: [6],
    //   id: 4,
    //   direction: '熱した型に生地を入れて焼く',
    // },
  },
  instructinosOrder: ['inst-1', 'inst-2'],
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Dnd = () => {
  const [state, setState] = useState({
    items: getItems(3),
    selected: getItems(3, 10),
  });
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
    const { source, destination } = result;
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
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      const newState = { ...state };
      newState[id2List[source.droppableId]] = items;
      setState(newState);
    } else {
      const newResult = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setState({
        items: newResult.droppable,
        selected: newResult.droppable2,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <IngredientsList droppableId="droppable" items={state.items} />
      <IngredientsList droppableId="droppable2" items={state.selected} />
    </DragDropContext>
  );
};

export default Dnd;
