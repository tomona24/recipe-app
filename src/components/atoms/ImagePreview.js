import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { BigNumber } from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

const ImagePreview = (props) => {
  const { id, path, key } = props;
  const classes = useStyles();

  console.log(path);

  return (
    <div>
      あいうえお
      <img src={path} alt={id} />
    </div>
  );
};

export default ImagePreview;
