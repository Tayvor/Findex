const STORE_IMAGE = 'STORE_IMAGE';


// ACTIONS
const storeImage = (imageUrl) => ({
  type: STORE_IMAGE,
  imageUrl
})


// THUNKS
export const thunkUploadImage = (post) => async (dispatch) => {
  const res = await fetch(`/api/images/new`, {
    method: "POST",
    body: post
  });

  if (res.ok) {
    const { resPost } = await res.json();
    dispatch(storeImage(resPost));
  } else {
    console.log("There was an error making your post!")
  }
};


// REDUCER
const initialState = {};

function images(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_IMAGE:
      const image = action.image
      return newState;

    default:
      return state;
  }
}

export default images;
