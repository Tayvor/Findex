import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetThreads } from "../../redux/threads";
import { thunkGetUserLikes } from "../../redux/likes";
import NavBar from "../NavBar";
import './Threads.css';
import formatDate from "../../functions/formatDate";


function Threads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { communityId } = useParams();

  const threads = Object.values(useSelector((state) => state.threads));
  const currUser = useSelector((state) => state.session.user);
  // const currUserLikes = useSelector((state) => state.currUserLikes);

  useEffect(() => {
    dispatch(thunkGetThreads(communityId));
    if (currUser) {
      dispatch(thunkGetUserLikes());
    }
  }, [dispatch, communityId, currUser]);


  return (
    <>
      <NavBar />

      {threads &&
        <div className="threadsWrapper">

          {threads.map((thread) =>
            <div
              className='thread clickable'
              onClick={() => navigate(`/communities/${communityId}/threads/${thread.id}`)}
              key={thread.id}
            >
              {thread.image_url ?
                <img src={`${thread.image_url}`} className="threadBackgroundImage" />
                : ''
              }

              <div className="threadText">
                <div className="threadTitle">{thread.title}</div>

                <div className="threadInfo">
                  <div>{thread.user.username}</div>

                  <div>
                    {/* {currUser && currUserLikes.threadLikes[thread.id] ?
                      <i className="fa-solid fa-arrow-up liked"></i> : ''
                    }
                    {' '} */}
                    {formatDate(thread.created_at)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  )
}

export default Threads;
