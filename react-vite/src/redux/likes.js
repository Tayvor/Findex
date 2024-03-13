const STORE_USER_LIKES = 'STORE_USER_LIKES';
const STORE_LIKE = 'STORE_LIKE';
const DELETE_LIKE = 'DELETE_LIKE';


// ACTIONS
const storeUserLikes = (likes) => ({
  type: STORE_USER_LIKES,
  likes,
});

const storeLike = (like) => ({
  type: STORE_LIKE,
  like,
});

const deleteLike = (likeId) => ({
  type: DELETE_LIKE,
  likeId,
});


// THUNKS
export const thunkGetUserLikes = () => async (dispatch) => {
  const res = await fetch(`/api/likes`);

  if (res.ok) {
    const userLikes = await res.json();
    dispatch(storeUserLikes(userLikes));
  }
};

export const thunkCreateLike = (type, id) => async (dispatch) => {
  const res = await fetch(`/api/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, id }),
  });

  if (res.ok) {
    const like = await res.json();
    dispatch(storeLike(like));
  }
};

export const thunkDeleteLike = (id) => async (dispatch) => {
  const res = await fetch(`/api/likes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(id),
  });

  const like = await res.json();
  dispatch(deleteLike(like));
};


// REDUCER
const initialState = { threadLikes: {}, commentLikes: {} };

function currUserLikes(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {

    case STORE_USER_LIKES:
      action.likes.map((like) => {
        if (like.thread_id) {
          newState.threadLikes[like.thread_id] = like;
        } else {
          newState.commentLikes[like.comment_id] = like;
        }
      })

      return newState;

    case STORE_LIKE:
      const like = action.like;

      if (like.thread_id) {
        newState.threadLikes[like.thread_id] = like;
      } else {
        newState.commentLikes[like.comment_id] = like;
      }
      return newState;

    case DELETE_LIKE:
      delete newState[action.like.id];
      return newState;

    default:
      return state;
  }
}

export default currUserLikes;
