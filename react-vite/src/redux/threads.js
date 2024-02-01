const STORE_THREADS = 'STORE_THREADS';


// ACTIONS
const storeThreads = (threads) => ({
  type: STORE_THREADS,
  threads: threads
});


// THUNKS
export const thunkGetThreads = (id = 0) => async (dispatch) => {
  if (id) {
    const res = await fetch(`/api/threads/${id}`)

    if (res.ok) {
      const data = await res.json();
      dispatch(storeThreads(data));
    }
  } else {
    const res = await fetch('/api/threads');

    if (res.ok) {
      const data = await res.json();
      dispatch(storeThreads(data));
    }
  }
}


// REDUCER
function threads(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case STORE_THREADS:
      newState = { ...state }
      action.threads.map((thread) => newState[thread.id] = thread);
      return newState;

    default:
      return state;
  }
}

export default threads;
