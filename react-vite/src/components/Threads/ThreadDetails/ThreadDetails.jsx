import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetThreadImages } from "../../../redux/images";
// import { thunkCreateLike, thunkDeleteLike } from "../../../redux/likes";
import OpenModalButton from "../../OpenModalButton";
import Comments from "../../Comments";
import EditThread from '../EditThread';
import './ThreadDetails.css';
import NavBar from "../../NavBar";
import formatDate from "../../../functions/formatDate";
// import LikeButton from "../../LikeButton";


function ThreadDetails() {
  const dispatch = useDispatch();
  const { threadId } = useParams();

  const thread = useSelector((state) => state.threads[threadId]);
  const user = useSelector((state) => state.session.user);
  const threadImage = useSelector((state) => state.images[threadId]);
  // const currUserLikes = useSelector((state) => state.currUserLikes);

  useEffect(() => {
    dispatch(thunkGetThreadImages(threadId));
  }, [dispatch, threadId]);


  return (
    <>
      <NavBar threadId={threadId} />

      <div className="threadDetailsWrapper">
        {thread &&
          <div className="threadDetails">
            <div className="threadDetails-Title">{thread.title}</div>
            <div className="threadDetails-Desc">{thread.description}</div>

            {threadImage &&
              <img
                src={threadImage.image_url}
                className="threadDetails-Image"
              ></img>
            }

            <div className="threadDetails-Footer">
              <div>{thread.user.username}</div>

              {/* <LikeButton comment={thread} /> */}

              <div className="threadDetails-FooterRight">
                {user?.id === thread.user.id && (
                  < OpenModalButton
                    modalComponent={
                      <EditThread threadId={threadId} threadImage={threadImage} />
                    }
                    buttonText='edit'
                    className='threadDetails-EditBtn clickable'
                  />
                )}

                <div>{formatDate(thread.created_at)}</div>
              </div>
            </div>

          </div>
        }
      </div>

      <Comments threadId={threadId} />

    </>
  )
}

export default ThreadDetails;
