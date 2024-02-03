import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './ThreadDetails.css';
import Comments from "../../Comments";


function ThreadDetails() {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user)
  const back = '<'

  const checkUserId = (user) => {
    if (user.id === thread.user_id) {
      return (
        <button
          className="threadDetails-EditBtn clickable"
          onClick={() => navigate(`/threads/${threadId}/edit`)}
        >:</button>
      )
    } else {
      return (
        <button
          className="threadDetails-ReplyBtn clickable"
        >+</button>
      )
    }
  }

  // Bug with refresh clearing redux state.
  // Could dispatch(thunkGetThread(threadId))
  // then force re-render.
  // or look into persistent storage in the browser, w18

  return (thread &&
    <>
      < div className="threadDetails-Container">
        < div className="threadDetails-Header">
          <button
            className="threadDetails-BackBtn clickable"
            onClick={() => navigate('/')}
          >{back}</button>

          <div
            className="threadDetails-Title"
          >{thread.title}</div>

          {
            currUser !== null ? checkUserId(currUser)
              :
              <button
                className="hiddenBtn"
              ></button>
          }
        </div >

        <div className="threadDetails-Desc">
          <p>{thread.description}</p>
        </div>

        <Comments threadId={threadId} />
      </div >
    </>
  )
}

export default ThreadDetails;
