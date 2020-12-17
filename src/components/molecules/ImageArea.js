/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, ButtonBase } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ImagePreview from '../atoms/ImagePreview';

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
  const {
    t,
    images,
    setImages,
    firebase: { storage },
  } = props;
  const [files, setFiles] = useState([]);

  const onFilesDrop = useCallback(
    (file) => {
      const blob = new Blob(file, { type: file[0].type });

      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');

      setFiles(
        file.map((item) =>
          Object.assign(item, {
            preview: URL.createObjectURL(item),
            id: fileName,
            title: item.name,
          })
        )
      );

      const uploadRef = storage().ref(filesPath).child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          setImages([newImage]);
        });
      });
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

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onFileDelete = useCallback(
    async (id) => {
      const ret = window.confirm('この画像を削除しますか？');
      if (!ret) {
        return false;
      }
      const newImages = images.filter((image) => image.id !== id);
      setImages(newImages);
      const newFiles = files.filter((image) => image.id !== id);
      setFiles(newFiles);
      return storage().ref(filesPath).child(id).delete();
    },
    [images]
  );

  const thumbs = files.map((file) => (
    <ButtonBase
      focusRipple
      key={file.name}
      className={classes.image}
      onClick={() => {
        onFileDelete(file.id);
      }}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${file.preview})`,
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
          {file.name}
        </Typography>
      </span>
    </ButtonBase>
  ));

  const dropZone = (
    <div {...getRootProps({ className: classes.dropZone })}>
      <input {...getInputProps()} />
      <AddPhotoAlternateIcon />
      <br />
      <Typography variant="button">
        Drag and drop some files here, or click to select files
      </Typography>
      <Divider />
      <Typography variant="subtitle2">
        Only *.jpeg and *.png images will be accepted
      </Typography>
      <Typography variant="subtitle2">
        1 files are the maximum number of files you can drop here
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>{images.length > 0 ? thumbs : dropZone}</div>
  );
};

export default firebaseConnect()(ImageArea);
