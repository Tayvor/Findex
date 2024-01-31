const STORE_THREADS = 'STORE_THREADS';


// ACTIONS
const storeThreads = (threads) => ({
  type: STORE_THREADS,
  threads
});


// THUNKS
export const thunkGetThreads = async (dispatch) => {
  const res = await fetch('/api/threads');

  if (res.ok) {
    const data = await res.json();
    dispatch(storeThreads(data));
  }
}


// REDUCER
function threads(state = {}, action) {
  switch (action.type) {
    case STORE_THREADS:
      return state;

    default:
      return state;
  }
}

export default threads;
