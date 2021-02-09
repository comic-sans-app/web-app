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
    var storage = firebase.storage();
    var listOfUrls = [];

    // Create a reference under which you want to list
    let storageRef = storage.ref();
    var listRef = storageRef.child('characters/');
    // Find all the prefixes and items.
    let listOfItems = await listRef.listAll();
    console.log('list of items', listOfItems)
    console.log('list of items.items', listOfItems.items)
    console.log('promise.value', listOfItems.items[1])
      listOfItems.items.map(item => {
        return listOfUrls.push(item.getDownloadURL())})
      // .then((res) => {
      //     res.prefixes.forEach((folderRef) => {
      //     // All the prefixes under listRef.
      //     // You may call listAll() recursively on them.
      //     });
      //     res.items.forEach((itemRef) => {
      //     // All the items under listRef.
      //     // console.log('item ref is:', itemRef)
      //     listOfUrls.push(itemRef.getDownloadURL())
      //     // console.log('item url???', itemRef.getDownloadURL());
      //     });
      // }).catch((error) => {
      //     // Uh-oh, an error occurred!
      // });

    // try {
    //   const {data} = await axios.get('/api/characters')
    //   dispatch(getCharacters(data))
    // } catch (error) {
    //   console.log(`Error fetching characters!`)
    // }
      console.log('So many promises but such few returns.....grrr')
      console.log('list of Urls', listOfUrls)
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
