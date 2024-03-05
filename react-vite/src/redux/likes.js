const STORE_LIKE = 'STORE_LIKE';
// const REMOVE_LIKE = 'REMOVE_LIKE';


// ACTIONS
const storeLike = (like) => ({
  type: STORE_LIKE,
  like,
});


// THUNKS
export const thunkCreateLike = (type, id) => async (dispatch) => {
  const res = await fetch(`/api/likes/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, id }),
  });

  const like = await res.json();
  dispatch(storeLike(like));
};


// REDUCER
const initialState = { threads: {}, comments: {} };

function likes(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_LIKE:
      newState[action.like.id] = action.like;
      return newState;

    default:
      return state;
  }
}

export default likes;
