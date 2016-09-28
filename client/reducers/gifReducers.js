export default (state = {}, action) => {
  switch(action.type) {
    case 'ADD_GIFS':
      return {
        ...state,
        isSearching: false,
        data: action.payload,
        error: null
      }
    case 'IS_SEARCHING':
      return {
        ...state,
        isSearching: true,
        error: null
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
