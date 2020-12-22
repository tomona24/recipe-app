/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, ButtonBase } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import AirDialog from '../atoms/AirDialog';

const filesPath = 'uploadedRecipeImages';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dropZone: {
    minWidth: 345,
    border: '3px dashed #ccc',
    padding: theme.spacing(2, 3),
  },
  image: {
    width: 200,
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
}));

const ImageArea = (props) => {
  const { t, images, saveImages, deleteImages } = props;

  const onFilesDrop = useCallback(
    (file) => {
      saveImages(file);
    },
    [images]
  );

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
    maxfilesize: 3,
    onDrop: (acceptedFiles) => {
      onFilesDrop(acceptedFiles);
    },
  });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const onFileDelete = useCallback(() => {
    const id = deleteId;
    const ret = Boolean(deleteId);
    if (!ret) {
      setDeleteId(null);
    }
    deleteImages(id);
  }, [images, deleteId]);

  const handleDialogClose = (reply) => {
    setOpen(false);
    if (reply) {
      onFileDelete();
    }
  };

  const thumbs = images.map((image) => (
    <div key={image.id}>
      <ButtonBase
        focusRipple
        className={classes.image}
        onClick={() => {
          setDeleteId(image.id);
          handleDialogClickOpen();
        }}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${image.path})`,
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            <DeleteForeverRoundedIcon />
          </Typography>
        </span>
      </ButtonBase>
      <AirDialog
        t={t}
        confirmText={t('この画像を削除しますか？')}
        title={t('登録した画像の削除')}
        agreeText={t('削除する')}
        disagreeText={t('削除しない')}
        handleDialogClose={handleDialogClose}
        open={open}
      />
    </div>
  ));

  const dropZone = (
    <div {...getRootProps({ className: classes.dropZone })}>
      <input {...getInputProps()} />
      <AddPhotoAlternateIcon />
      <br />
      <Typography variant="button">
        {t('ファイルをドラッグ＆ドロップ　もしくは　ファイルを選択')}
      </Typography>
      <Divider />
      <Typography variant="subtitle2">
        {t('jpeg、jpg、pngのいずれかファイルのみです。')}
      </Typography>
      <Typography variant="subtitle2">
        {t('1ファイルまでアップロードができます。')}
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>{images.length > 0 ? thumbs : dropZone}</div>
  );
};

export default ImageArea;
