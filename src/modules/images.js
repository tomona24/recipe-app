// action types
export const SAVE_IMAGE = 'recipe-app/images/SAVE_IMAGE';
export const SET_IMAGE = 'recipe-app/images/SET_IMAGE';
export const DELETE_IMAGE = 'recipe-app/images/DELETE_IMAGE';

const filesPath = 'uploadedRecipeImages';
const initialState = [];

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return action.images;
    case SAVE_IMAGE:
      return action.images;
    case DELETE_IMAGE:
      return state.filter((image) => image.id !== action.id);
    default:
      return state;
  }
};
export default imagesReducer;

// action creators
export const setImages = (images) => {
  return (dispatch) => {
    dispatch({
      type: SET_IMAGE,
      images,
    });
  };
};

export const saveImages = (file) => {
  return (dispatch, getState, getFirebase) => {
    const storage = getFirebase().storage();
    const blob = new Blob(file, { type: file[0].type });

    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join('');

    file.map((item) =>
      Object.assign(item, {
        id: fileName,
        title: item.name,
      })
    );
    const uploadRef = storage.ref(filesPath).child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask
      .then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          dispatch({
            type: SAVE_IMAGE,
            images: [newImage],
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteImages = (deleteId) => {
  return (dispatch, getState, getFirebase) => {
    const storage = getFirebase().storage();
    storage
      .ref(filesPath)
      .child(deleteId)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_IMAGE,
          id: deleteId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
