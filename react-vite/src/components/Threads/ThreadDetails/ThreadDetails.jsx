import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetThreadImages } from "../../../redux/images";
import OpenModalButton from "../../OpenModalButton";
import Comments from "../../Comments";
import EditThread from '../EditThread';
import './ThreadDetails.css';
import NavBar from "../../NavBar";
import formatDate from "../../../functions/formatDate";


function ThreadDetails() {
  const dispatch = useDispatch();
  const { threadId } = useParams();

  const thread = useSelector((state) => state.threads[threadId]);
  const user = useSelector((state) => state.session.user);
  const threadImage = useSelector((state) => state.images[threadId]);

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
              <div>{thread.author.username}</div>

              <div className="threadDetails-FooterRight">
                {user?.id === thread.author.id && (
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

      <Comments />
    </>
  )
}

export default ThreadDetails;
