const STORE_COMMENTS = 'STORE_COMMENTS';


// ACTIONS
const storeComments = (comments) => ({
  type: STORE_COMMENTS,
  comments
})


// THUNKS
export const thunkGetComments = (threadId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${threadId}`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(storeComments(comments));
  }
}


// REDUCER
function comments(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case STORE_COMMENTS:
      newState = { ...state }
      action.comments.map((comment) => newState[comment.id] = comment);
      return newState;

    default:
      return state;
  }
}

export default comments;
