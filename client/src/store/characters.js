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
    let charUrls = [];
    var storage = firebase.storage();
    // Create a reference under which you want to list
    let storageRef = storage.ref();
    var listRef = storageRef.child('characters/');
    // Find all the prefixes and items.
    let downloadedURLS; 
    
    listRef
    .listAll()
    .then(snap => {
       snap.items.forEach(itemRef => {
         downloadedURLS = itemRef.getDownloadURL().toString()
         charUrls.push(downloadedURLS)
        
        // .then(imgUrl => {
        //   charUrls.push(imgUrl.getResult())
        // })
      })

      console.log('char urls in store', charUrls)
      dispatch(getCharacters(charUrls))
    })
    // console.log('charUrls in store', charUrls)

    // try {
    //   const {data} = await axios.get('/api/characters')
    //   dispatch(getCharacters(data))
    // } catch (error) {
    //   console.log(`Error fetching characters!`)
    // }
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
