const STORE_COMMENTS = 'STORE_COMMENTS';
const STORE_COMMENT = 'STORE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';


// ACTIONS
const storeComments = (comments) => ({
  type: STORE_COMMENTS,
  comments
});

const storeComment = (comment) => ({
  type: STORE_COMMENT,
  comment
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
});


// THUNKS
export const thunkGetComments = (threadId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${threadId}`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(storeComments(comments));
  }
};

export const thunkCreateComment = (info) => async (dispatch) => {
  const res = await fetch(`/api/comments/new`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });

  const data = await res.json();
  dispatch(storeComment(data));
};

export const thunkEditComment = (info, commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/edit`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });

  const data = await res.json();
  dispatch(storeComment(data));
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteComment(commentId));
  }
};


// REDUCER
const initialState = {};

function comments(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_COMMENTS:
      action.comments.map((comment) => newState[comment.id] = comment)
      return newState;

    case STORE_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment }
      return newState;

    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.commentId];
      return newState;

    default:
      return state;
  }
}

export default comments;
