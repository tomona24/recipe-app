// action types
// reducers

export const UPDATE_FORM = 'recipe-app/form/UPDATE_FORM';

const initialState = {
  data: {},
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        formData: action.data,
      };

    default:
      return state;
  }
};
export default formReducer;

export const updateFormData = (data) => {
  return {
    type: UPDATE_FORM,
    data,
  };
};
