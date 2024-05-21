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
