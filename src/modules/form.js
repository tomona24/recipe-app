// action types
// reducers

export const UPDATE = 'recipe-app/recipes/UPDATE';

const initialState = {
  data: {},
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
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
    type: UPDATE,
    data,
  };
};
