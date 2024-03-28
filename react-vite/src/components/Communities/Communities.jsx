import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Communities.css';
import Threads from '../Threads';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateThread from '../Threads/CreateThread';
import ThreadDetails from '../Threads/ThreadDetails/ThreadDetails';
import CreateCommentModal from '../Comments/CreateComment/CreateCommentModal';


function Communities() {
  const communities = Object.values(useSelector((state) => state.communities));
  const userLoggedIn = useSelector((state) => state.session.user);

  const [communityName, setCommunityName] = useState('');
  const [communityId, setCommunityId] = useState(false);
  const [threadId, setThreadId] = useState(false);
  const [test, setTest] = useState(false);

  const viewCommunity = (name, id) => {
    setCommunityName(name);
    setCommunityId(id);
    return;
  }

  const viewThread = (id) => {
    setThreadId(id);
    setCommunityName((name) => name + ' > Thread');
    return;
  }

  const goBack = () => {
    if (threadId) {
      setThreadId(false);
      const community = communityName.split(' ');
      setCommunityName(community[0]);
    } else {
      setCommunityName('');
      setCommunityId(false);
    }
    return;
  }


  return (
    <>
      <div className="navBar">
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
      </div>


      {!communityName &&
        <div className="discussionsWrapper">
          {communities.map((community) =>
            <div
              key={community.id}
              className='communityBox'
            >
              <div
                onClick={() => viewCommunity(community.name, community.id)}
                className='communityTitle clickable uLine'
              >{community.name}
              </div>

              <div>{community.description}</div>
            </div>
          )}
        </div>
      }


      {communityName && !threadId &&
        <Threads
          communityId={communityId}
          viewThread={viewThread}
        />
      }


      {threadId &&
        <ThreadDetails
          threadId={threadId}
          goBack={goBack}
        />
      }
    </>
  )
}

export default Communities;
