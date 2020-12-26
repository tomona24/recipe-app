import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { Grid, List } from '@material-ui/core';
import IngList from '../atoms/DndIngredientsList';
import muiTheme from '../theme';

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? muiTheme.palette.primary.light : 'lightgrey',
  padding: 8,
  width: 250,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    padding: theme.spacing(2),
    border: `1px solid #ccc`,
    borderRadius: 4,
    margin: theme.spacing(1, 0),
  },
}));

const DndInstructionList = React.memo((props) => {
  const { droppableId, items } = props;
  const classes = useStyles();
  const shouldComponentUpdate = (nextProps) => {
    return props.items !== nextProps.items;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {items.map((item, index) => (
                  <IngList item={item} index={index} key={item.id} />
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </Grid>
      <Grid item>インストラクション</Grid>
    </Grid>
  );
});

export default DndInstructionList;
