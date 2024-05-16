import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetCommunities } from '../../redux/communities';
import './Communities.css';


function Communities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(thunkGetCommunities());
  }, [dispatch]);

  const communities = Object.values(useSelector((state) => state.communities));


  return (
    <>
      {/* <div className="navBar">
        <button
          className="backBtn clickable"
          onClick={goBack}
          hidden={communityId ? false : true}
        ><i className="fa-solid fa-chevron-up fa-rotate-270"></i>
        </button>

        <div className="communityName">{communityName || 'Discussions'}</div>

        {communityName &&
          <OpenModalButton
            modalComponent={!threadId ?
              <CreateThread communityId={communityId} />
              :
              <CreateCommentModal threadId={threadId} />
            }
            buttonText={!threadId ? <i className="fa-solid fa-plus"></i> :
              <i className="fa-regular fa-comment"></i>
            }
            className={userLoggedIn ? 'createBtn clickable' : 'createBtnDisabled'}
            disabled={userLoggedIn ? false : true}
          />
        }
      </div> */}

      <div className='displayFlex'>
        {communities &&
          <div className="communitiesWrapper">

            {communities.map((community) =>
              <div
                className='community clickable'
                onClick={() => navigate(`/communities/${community.id}`)}
                key={community.id}
              >{community.name}

                <div
                  className='communityDesc'
                  style={{ fontSize: 18 }}
                >{community.description}</div>
              </div>
            )}
          </div>
        }
      </div>
    </>
  )
}

export default Communities;
