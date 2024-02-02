import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkEditThread } from "../../../redux/threads";
import './EditThread.css'


function EditThread() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          type="submit"
        >=</button>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', threadId);
    formData.append('title', title);
    formData.append('desc', desc);

    dispatch(thunkEditThread(formData));
  }


  return (thread &&
    <form className="editThread-Form" onSubmit={handleSubmit}>
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

        {currUser !== null ? checkUserId(currUser) : ''}
      </div>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="editThread-Desc"
      ></textarea>
    </form >
  )
}

export default EditThread;
