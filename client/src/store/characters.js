import axios from 'axios'

// action types
const GET_CHARACTERS = 'GET_CHARACTERS';

// action creators
export const getCharacters = (characters) => {
  return {
    type: GET_CHARACTERS,
    characters,
  };
};

const initialState = [];

export const fetchCharacters = () => async dispatch => {
    try {
      console.log('before start')
      const {data} = await axios.get('/api/characters')
      console.log('what is data in thunk:', data)
      dispatch(getCharacters(data))
    } catch (error) {
      console.log(`Error fetching characters!`)
    }
  }

// reducer
export default function characters(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return [...action.characters];
    default:
      return state;
  }
}
