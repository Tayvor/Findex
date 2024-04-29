const STORE_IMAGE = 'STORE_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';


// ACTIONS
const storeImage = (image) => ({
  type: STORE_IMAGE,
  image
});

const deleteThreadImage = (threadId) => ({
  type: DELETE_IMAGE,
  threadId
});


// THUNKS
export const thunkUploadImage = (post) => async (dispatch) => {
  const res = await fetch(`/api/images/new`, {
    method: "POST",
    body: post
  });

  if (res.ok) {
    const image = await res.json();
    dispatch(storeImage(image));
  } else {
    console.log("There was an error making your post!")
  }
};

export const thunkGetThreadImages = (threadId) => async (dispatch) => {
  const res = await fetch(`/api/images/${threadId}`)

  if (res.ok) {
    const data = await res.json();
    if (!data.error) {
      dispatch(storeImage(data));
    }
  }
};

export const thunkDeleteImage = (fileName) => async (dispatch) => {
  const res = await fetch(`/api/images/${fileName}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteThreadImage(data.thread_id));
  }
};


// REDUCER
const initialState = {};

function images(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_IMAGE:
      newState = { ...state };
      newState[action.image.thread_id] = action.image;
      return newState;

    case DELETE_IMAGE:
      newState = { ...state };
      delete newState[action.threadId];
      return newState;

    default:
      return state;
  }
}

export default images;
