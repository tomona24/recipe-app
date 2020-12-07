import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = (props) => {
  const { recipes } = props;
  const { id } = useParams();
  const [pickedRecipe, setPickedRecipe] = useState('');
  useEffect(() => {
    setPickedRecipe(recipes[id]);
  }, [pickedRecipe]);
  return (
    <div>
      <h3>レシピ</h3>
      {/* <p>{chosenRecipe.ingredients}</p> */}
      {/* <p>{chosenRecipe.instructions}</p> */}
    </div>
  );
};

export default Detail;
