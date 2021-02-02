import axios from 'axios'
// action types
const GET_CANVAS = 'GET_CANVAS';
const SET_CANVAS = 'SET_CANVAS'


const initialState = {};

// action creators
export const getCanvas = (canvas, id) => {
  return {
    type: GET_CANVAS,
    canvas,
    id
  };
};

export const setCanvas = (canvas, id) => {
  return {
    type: SET_CANVAS,
    canvas,
    id
  }
}

// thunkidy thunk goes here
export const fetchCanvasElements = (canvas, id) => async dispatch => {

  try {
    const { data } = await axios.get(`/api/canvas/${id}`)
  }

  catch (error) {
    console.error('Something went wrong when fetching canvas elements', error)
  }
}

export const saveCanvasElements = (canvas, id) => async dispatch => {
  try {
    console.log('saving canvas elements')
    const { data } = await axios.post(`/api/canvas/${id}`, canvas)
    // dispatch an action here??
  }

  catch (error) {
    console.error('Something went wrong when saving canvas elements', error)
  }
}

// reducer
export default function canvas(state = initialState, action) {
  switch (action.type) {
    case GET_CANVAS:
      return state;

    case SET_CANVAS:
      return { elements: [...action.canvas], id: action.id };

    default:
      return state;
  }
}
