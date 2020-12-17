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
  const classes = useStyles();

  return <div className={classes.root}>テンプレ</div>;
};

export default ImagePreview;
