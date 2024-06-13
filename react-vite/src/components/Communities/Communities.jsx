import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetCommunities } from '../../redux/communities';
import './Communities.css';


function Communities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const communities = Object.values(useSelector((state) => state.communities));

  useEffect(() => {
    dispatch(thunkGetCommunities());
  }, [dispatch]);


  return (
    <>
      <div className='communitiesWrapper'>
        {communities &&
          <div className="communities">

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
