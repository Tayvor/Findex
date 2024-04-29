const STORE_IMAGE = 'STORE_IMAGE';
const STORE_IMAGES = 'STORE_IMAGES';
const DELETE_IMAGES = 'DELETE_IMAGES';


// ACTIONS
// const storeImage = (image) => ({
//   type: STORE_IMAGE,
//   image
// })

const storeImages = (images, threadId) => ({
  type: STORE_IMAGES,
  images,
  threadId
})

const deleteThreadImages = (threadId) => ({
  type: DELETE_IMAGES,
  threadId
})


// THUNKS
export const thunkUploadImage = (post) => async () => {
  const res = await fetch(`/api/images/new`, {
    method: "POST",
    body: post
  });

  if (res.ok) {
    // const image = await res.json();
    // dispatch(storeImage(image));
  } else {
    console.log("There was an error making your post!")
  }
};

export const thunkGetThreadImages = (threadId) => async (dispatch) => {
  const res = await fetch(`/api/images/${threadId}`)

  if (res.ok) {
    const images = await res.json();
    dispatch(storeImages(images, threadId));
  } else {
    console.log("There was an error making your post!")
  }
}

export const thunkDeleteImages = (fileName) => async (dispatch) => {
  const res = await fetch(`/api/images/${fileName}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteThreadImages(data.thread_id));
  }
}


// REDUCER
const initialState = {};

function images(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_IMAGE:
      newState = { ...state };
      if (newState[action.image.thread_id]) {
        newState[action.image.thread_id].push(action.image);
      } else {
        newState[action.image.thread_id] = [];
        newState[action.image.thread_id].push(action.image);
      }
      return newState;

    case STORE_IMAGES:
      newState = { ...state };
      newState[action.threadId] = action.images;
      return newState;

    case DELETE_IMAGES:
      newState = { ...state };
      delete newState[action.threadId]
      return newState;

    default:
      return state;
  }
}

export default images;
