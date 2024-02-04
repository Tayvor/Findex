const STORE_THREADS = 'STORE_THREADS';
const UPDATE_THREAD = 'UPDATE_THREAD';
const DELETE_THREAD = 'DELETE_THREAD';


// ACTIONS
const storeThreads = (threads) => ({
  type: STORE_THREADS,
  threads: threads
});

const updateThread = (thread) => ({
  type: UPDATE_THREAD,
  thread
});

const deleteThread = (threadId) => ({
  type: DELETE_THREAD,
  threadId
});


// THUNKS
export const thunkGetThreads = (id = 0) => async (dispatch) => {
  if (id) {
    const res = await fetch(`/api/threads/${id}`);

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
};


export const thunkCreateThread = (info) => async () => {
  const res = await fetch('/api/threads/create', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });

  const data = await res.json();
  return data
}


export const thunkEditThread = (info, threadId) => async (dispatch) => {
  const res = await fetch(`/api/threads/${threadId}/edit`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateThread(data));
  } else if (res.status < 500) {
    const errors = await res.json();
    return errors
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}


export const thunkDeleteThread = (threadId) => async (dispatch) => {
  const res = await fetch(`/api/threads/${threadId}/delete`, {
    method: 'DELETE',
  });

  if (res.ok) {
    // const data = await res.json();
    dispatch(deleteThread(threadId));
  } else if (res.status < 500) {
    const errors = await res.json();
    return errors
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}


// REDUCER
const initialState = {};

function threads(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_THREADS:
      newState = { ...state }
      action.threads.map((thread) => newState[thread.id] = thread);
      return newState;

    case DELETE_THREAD:
      newState = { ...state };
      delete newState[action.threadId];
      return newState;

    default:
      return state;
  }
}

export default threads;
