// action types
const GET_BUBBLES = 'GET_BUBBLES';

// action creators
export const getBubbles = (bubbles) => {
  return {
    type: GET_BUBBLES,
    bubbles,
  };
};

const initialState = [];

// reducer
export default function bubbles(state = initialState, action) {
  switch (action.type) {
    case GET_BUBBLES:
      return [...action.bubbles];
    default:
      return state;
  }
}
