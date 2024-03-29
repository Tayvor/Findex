import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetThreadImages } from "../../../redux/images";
import { thunkCreateLike, thunkDeleteLike } from "../../../redux/likes";
import Comments from "../../Comments";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateCommentModal from '../../Comments/CreateComment/CreateCommentModal';
import './ThreadDetails.css';


function ThreadDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { threadId } = useParams();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user);
  const threadImages = useSelector((state) => state.images[threadId]);
  const currUserLikes = useSelector((state) => state.currUserLikes);

  useEffect(() => {
    dispatch(thunkGetThreadImages(threadId));
  }, [dispatch, threadId]);

  const getTime = (created_at) => {
    const dateCreated = String(created_at).split(' ')[0].split('-');
    const timeCreated = String(created_at).split(' ')[1].slice(0, 8).split(':');

    const [yearCreated, monthCreated, dayCreated] = dateCreated;
    const [hourCreated, minuteCreated, secondCreated] = timeCreated;

    const oldDateTime = Date.UTC(
      Number(yearCreated),
      (Number(monthCreated) - 1),
      dayCreated,
      hourCreated,
      minuteCreated,
      secondCreated
    )

    const currDateTime = Date.now();
    const elapsedTime = currDateTime - oldDateTime;

    // let years = Math.floor(elapsedTime / (60000 * 60 * 24 * 365));
    // let months = Math.floor(elapsedTime / (60000 * 60 * 24 * 30));
    let days = Math.floor(elapsedTime / (60000 * 60 * 24));
    let hours = Math.floor(elapsedTime / (60000 * 60));
    let minutes = Math.floor(elapsedTime / 60000);

    if (days >= 1) {
      if (days === 1) {
        return `${days} day ago`;
      } else {
        return `${days} days ago`;
      }

    } else if (hours >= 1) {
      if (hours === 1) {
        return `${hours} hour ago`;
      } else {
        return `${hours} hours ago`;
      }

    } else if (minutes >= 1) {
      if (minutes === 1) {
        return `${minutes} minute ago`;
      } else {
        return `${minutes} minutes ago`;
      }

    } else {
      return 'A moment ago';
    }
  };

  const handleLike = (thread) => {
    if (!currUserLikes.threadLikes[thread.id]) {
      thread.num_likes += 1;
      dispatch(thunkCreateLike('thread', thread.id));
    } else {
      thread.num_likes -= 1;
      dispatch(thunkDeleteLike(currUserLikes.threadLikes[thread.id]));
    }
  }

  return (thread &&
    <>
      <div className="threadDetails-Container">
        <div className="threadDetails-Header">
          <button
            className="threadDetails-BackBtn clickable"
            onClick={() => navigate('/')}
          ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

          <div
            className="threadDetails-Title"
          >{thread.title}</div>

          {currUser && (
            < OpenModalButton
              modalComponent={<CreateCommentModal threadId={threadId} />}
              buttonText={<i className="fa-regular fa-comment"></i>}
              className='threadDetails-ReplyBtn clickable'
            />
          )}

          {!currUser && <button className="hiddenBtn"></button>}
        </div>

        <div className="threadDetails-Desc">
          {thread.description}

          <div className="threadDetails-Info">
            <div className="threadDetails-InfoLeft">
              <div
                className="threadDetails-Username"
              >{thread.user.username}</div> &bull;

              <div
                className="threadDetails-Time"
              >{getTime(thread.created_at)}</div> &bull;

              <div className="threadDetails-NumComments">
                <i className="fa-regular fa-comment"></i>
                {" "}
                {thread.num_comments}
              </div> &bull;

              {currUser && currUser.id !== thread.user_id ?
                <div
                  className={currUserLikes.threadLikes[thread.id] ?
                    "threadDetails-Likes isLiked clickable" : "threadDetails-Likes notLiked clickable"
                  }
                  onClick={() => handleLike(thread)}
                >
                  {currUserLikes.threadLikes[thread.id] ?
                    <i className="fa-solid fa-arrow-up liked"></i>
                    :
                    <i className="fa-solid fa-arrow-up"></i>
                  }
                  &nbsp;
                  {thread.num_likes}
                </div>
                :
                <div
                  className="threadDetails-Likes"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                  &nbsp;
                  {thread.num_likes}
                </div>
              }
            </div>

            {currUser?.id === thread.user_id ?
              <div
                className="threadDetails-Edit clickable"
                onClick={() => navigate(`/threads/${threadId}/edit`)}
              >edit</div>
              : ''
            }
          </div>
        </div>


        <div className="threadDetails-Footer">
          {threadImages && threadImages[0] &&
            <img
              src={threadImages[0]?.url}
              className="threadDetails-Image"
            ></img>
          }
        </div>
      </div>
      <Comments threadId={threadId} currUser={currUser} />
    </>
  )
}

export default ThreadDetails;
