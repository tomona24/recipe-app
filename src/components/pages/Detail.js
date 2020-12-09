import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = (props) => {
  const { recipes } = props;
  const { id } = useParams();
  const [recipe, setRecipe] = useState('');
  // useEffect(() => {
  //   setRecipe(recipes[id]);
  // }, [recipe]);

  console.log(recipe);

  return (
    <div>
      <h3>レシピ</h3>
      {/* <p>{chosenRecipe.ingredients}</p> */}
      {/* <p>{chosenRecipe.instructions}</p> */}
    </div>
  );
};

export default Detail;
