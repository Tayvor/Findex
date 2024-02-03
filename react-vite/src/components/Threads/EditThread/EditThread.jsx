import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkDeleteThread, thunkEditThread } from "../../../redux/threads";
import './EditThread.css'


function EditThread() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user)
  const back = '<'

  const [title, setTitle] = useState(thread.title);
  const [description, setDesc] = useState(thread.description);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInfo = {
      'title': title,
      'description': description,
    };

    const response = await dispatch(
      thunkEditThread(formInfo, threadId)
    );

    if (response) {
      setErrors(response);
    } else {
      navigate('/');
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteThread(threadId));
    navigate('/');
  };


  return (thread &&
    <>
      <form className="editThread-Form" onSubmit={handleSubmit}>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}

        <div className="editThread-Header">
          <button
            className="editThread-BackBtn clickable"
            onClick={() => navigate(`/threads/${threadId}`)}
          >{back}</button>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="editThread-Title"
            name="title"
          ></input>

          {currUser !== null ? checkUserId(currUser) : ''}
        </div>

        <textarea
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="editThread-Desc"
          name="desc"
        ></textarea>
      </form >

      <div className="alignCenterDiv">
        <div className="editThread-DeleteBtnDiv">
          <button
            className="editThread-DeleteBtn clickable"
            onClick={handleDelete}
          >X</button>
        </div>
      </div>
    </>
  )
}

export default EditThread;
