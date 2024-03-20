const STORE_COMMUNITIES = 'STORE_COMMUNITIES';


// ACTIONS
const storeCommunities = (communities) => ({
  type: STORE_COMMUNITIES,
  communities
});


// THUNKS
export const thunkGetCommunities = () => async (dispatch) => {
  const res = await fetch('/api/communities');

  if (res.ok) {
    const communities = await res.json();
    dispatch(storeCommunities(communities));
  }
};


// REDUCER
const initialState = {};

function communities(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case STORE_COMMUNITIES:
      action.communities.map((community) => newState[community.id] = community);
      return newState;

    default:
      return state;
  }
}

export default communities;
