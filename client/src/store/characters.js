// import axios from 'axios'
import firebase from 'firebase'

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
  let characterUrls = [];
  var storage = firebase.storage();
  // Create a reference under which you want to list
  let storageRef = storage.ref();
  var listRef = storageRef.child('characters/');
  // Find all the prefixes and items.

  listRef
  .listAll()
    .then(snapshot => {
      snapshot.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(imgUrl => {
          // as soon as we start pushing into the array, data turns into weird object
          characterUrls.push(imgUrl)
          // console logging umgUrl returns string
          console.log('image url is returned as string here', imgUrl)
        })
      })
    }
  )
  console.log('character urls', characterUrls)
}

// try {
//   const {data} = await axios.get('/api/characters')
//   dispatch(getCharacters(data))
// } catch (error) {
//   console.log(`Error fetching characters!`)
// }

// reducer
export default function characters(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return [...action.characters];
    default:
      return state;
  }
}
