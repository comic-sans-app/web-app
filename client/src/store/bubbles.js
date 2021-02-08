import axios from 'axios'

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

export const fetchBubbles = () => async dispatch => {
    try {
      console.log('before start')
      const {data} = await axios.get('/api/textbubbles')
      console.log('what is data in thunk:', data)
      dispatch(getBubbles(data))
    } catch (error) {
      console.log(`Error fetching bubbles!`)
    }
  }

// reducer
export default function bubbles(state = initialState, action) {
  switch (action.type) {
    case GET_BUBBLES:
      return [...action.bubbles];
    default:
      return state;
  }
}
