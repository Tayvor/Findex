const STORE_IMAGE = 'STORE_IMAGE';
const STORE_IMAGES = 'STORE_IMAGES';
const DELETE_IMAGES = 'DELETE_IMAGES';


// ACTIONS
const storeImage = (image) => ({
  type: STORE_IMAGE,
  image
})

const storeImages = (images) => ({
  type: STORE_IMAGES,
  images
})

const deleteThreadImages = (threadId) => ({
  type: DELETE_IMAGES,
  threadId
})


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

export const thunkGetImages = () => async (dispatch) => {
  const res = await fetch('/api/images')

  if (res.ok) {
    const images = await res.json();
    dispatch(storeImages(images));
  } else {
    console.log("There was an error making your post!")
  }
}

export const thunkDeleteImages = (threadId) => async (dispatch) => {
  // const res = await fetch('/api/images/delete', {
  //   method: 'DELETE',
  // })
  dispatch(deleteThreadImages(threadId));
}


// REDUCER
const initialState = {};

function images(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_IMAGE:
      newState = { ...state };
      newState[action.image.id] = action.image;
      return newState;

    case STORE_IMAGES:
      newState = { ...state };
      action.images.map((image) => newState[image.id] = image);
      return newState;

    case DELETE_IMAGES:
      // newState = { ...state };
      return newState;

    default:
      return state;
  }
}

export default images;
