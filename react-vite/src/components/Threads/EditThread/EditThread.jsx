import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './EditThread.css'


function EditThread() {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user)
  const back = '<'

  const [title, setTitle] = useState(thread.title);
  const [desc, setDesc] = useState(thread.description);

  const checkUserId = (user) => {
    if (user.id === thread.user_id) {
      return (
        <button
          className="editThread-SubmitBtn clickable"
          onClick={() => navigate(`/threads/${threadId}/edit`)}
        >=</button>
      )
    } else {
      return (
        <button
          className="threadDetails-ReplyBtn clickable"
        >+</button>
      )
    }
  }


  return (thread &&
    <form className="editThread-Form">
      <div className="editThread-Header">
        <button
          className="editThread-BackBtn clickable"
          onClick={() => navigate(`/threads/${threadId}`)}
        >{back}</button>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="editThread-Title"
        ></input>

        {
          currUser !== null ? checkUserId(currUser)
            :
            <button
              className="hiddenBtn"
            ></button>
        }
      </div>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="editThread-Desc"
      ></textarea>
    </form>
  )
}

export default EditThread;
