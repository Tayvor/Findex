import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './ThreadDetails.css';


function ThreadDetails() {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user)
  const back = '<'

  const checkLogin = (user) => {
    if (user.id === thread.id) {
      return (
        <button
          className="threadDetails-EditBtn clickable"
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


  return (
    <div
      className="threadDetails-Container"
    >
      <div
        className="threadDetails-Header"
      >
        <button
          className="threadDetails-BackBtn clickable"
          onClick={() => navigate('/')}
        >{back}</button>

        <div
          className="threadDetails-Title"
        >{thread.title}</div>

        {currUser !== null ? checkLogin(currUser)
          :
          <button
            className="hiddenBtn"
          ></button>
        }
      </div>

      <div className="threadDetails-Desc">
        <p>{thread.description}</p>
      </div>

    </div>
  )
}

export default ThreadDetails;
