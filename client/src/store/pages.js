// action types
const GET_PAGES = 'GET_PAGES';
const ADD_PAGE = 'ADD_PAGE';

const initialState = [];

// action creators
export const getPages = (pages) => {
  return {
    type: GET_PAGES,
    pages,
  };
};

export const addPage = (newPage) => {
  return {
    type: ADD_PAGE,
    newPage,
  };
};

// reducer
export default function pages(state = initialState, action) {
  switch (action.type) {
    case GET_PAGES:
      return [...action.pages];
    case ADD_PAGE:
      return [...state, action.newPage];
    default:
      return state;
  }
}
