import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Detail = (props) => {
  const { chosenRecipe } = props;
  return (
    <div>
      <h3>{chosenRecipe.title}</h3>
      {/* <p>{chosenRecipe.ingredients}</p> */}
      {/* <p>{chosenRecipe.instructions}</p> */}
    </div>
  );
};

export default Detail;
