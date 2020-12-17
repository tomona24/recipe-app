/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Checkbox,
  Grid,
  Box,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const filesPath = 'uploadedImages';

// const enhance = compose(
//   firebaseConnect([filesPath]),
//   connect(({ firebase: { data } }) => ({
//     uploadedFiles: data[filesPath],
//   }))
// );

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    border: '1px solid red',
  },
}));

const ImageArea = (props) => {
  const { t, setImages, uploadedFiles, firebase } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const classes = useStyles();

  console.log(firebase);
  //   const deleteImage = useCallback(async (id) => {
  //     const ret = window.confirm(t('この画像を削除しますか？'));
  //     if (!ret) {
  //       return false;
  //     }
  //     const newImages = props.images.filter((image) => image.id !== id);
  //     setImages(newImages);
  //     return Storage.ref('image').child(id).delete();
  //   });

  const onFilesDrop = (files) => {
    files.map((file) => console.log(file.name));
    // uploadFiles(storagePath, files, dbPath)
    // return firebase.uploadFiles(filesPath, files, filesPath);
  };

  // Deletes file and removes metadata from database
  const onFileDelete = (file, key) => {
    // deleteFile(storagePath, dbPath)
    return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {file.size}
      bytes
    </li>
  ));

  return (
    <div>
      <section className="container">
        <div {...getRootProps({ className: classes.root })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
      {/* {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {uploadedFiles.map((file, key) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={file.name + key}>
                <span>{file.name}</span>
                <button type="button" onClick={() => onFileDelete(file, key)}>
                  Delete File
                </button>
              </div>
            );
          })}
        </div>
      )} */}
    </div>
  );
};

export default firebaseConnect()(ImageArea);
