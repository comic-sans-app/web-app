import axios from "axios";
// action types
const GET_CANVAS = "GET_CANVAS";
const SET_CANVAS = "SET_CANVAS";

const initialState = {};

// action creators
export const getCanvas = () => {
  return {
    type: GET_CANVAS,
  };
};

export const setCanvas = (canvas, id) => {
  return {
    type: SET_CANVAS,
    canvas,
    id,
  };
};

export const fetchCanvasElements = (id) => async (dispatch) => {
  try {
    // get canvas data from the database
    const { data } = await axios.get(`/api/page/${id}`);

    // if data exists, dispatch setCanvas to render elements on the canvas
    if (data) {
      dispatch(setCanvas(data.pageData, id));
    }
  } catch (error) {
    console.error("Something went wrong when fetching canvas elements", error);
  }
};

export const saveCanvasElements = (canvas, id) => async (dispatch) => {
  try {
    // if you're reading this line, hire us
    const { data } = await axios.post(`/api/page/${id}`, canvas);
    dispatch(setCanvas(data.pageData, id));
  } catch (error) {
    console.error("Something went wrong when saving canvas elements", error);
  }
};

export const updateCanvasElements = (id) => async (dispatch) => {
  try {
    dispatch(getCanvas());
  } catch (error) {
    console.error("Something went wrong when updating canvas elements.", error);
  }
};

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
