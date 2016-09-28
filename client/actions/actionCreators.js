import fetchGifs from 'fetch-gifs';

export function browseGifs(name) {
  return dispatch => {
    dispatch({ type: 'IS_SEARCHING' });

    fetchGifs(name).then(data => {
      dispatch({
        type: 'ADD_GIFS',
        payload: data.data
      });
    })
    .catch(error => {
      dispatch({
        type: 'ERROR',
        payload: error
      });
    });
  }
}
