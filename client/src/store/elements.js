import axios from "axios";

const GET_CANVAS_ELEMENTS = "GET_CANVAS_ELEMENTS";

export const getCanvasElements = (elements) => {
  return {
    type: GET_CANVAS_ELEMENTS,
    elements,
  };
};

const initialState = [];

export const fetchCanvasElements = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/elements");
    dispatch(getCanvasElements(data));
  } catch (error) {
    console.error("Something went wrong when fetching canvas elements!");
  }
};

export default function elementsA(state = initialState, action) {
  switch (action.type) {
    case GET_CANVAS_ELEMENTS:
      return [...action.elements];
    default:
      return state;
  }
}

export * from "./elements";
