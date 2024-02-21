import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkDeleteThread, thunkEditThread } from "../../../redux/threads";
import { thunkDeleteImages } from "../../../redux/images";
import './EditThread.css'


function EditThread() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState(thread?.title);
  const [description, setDesc] = useState(thread?.description);
  const [errors, setErrors] = useState({});


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
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteThread(threadId))
      .then(() => dispatch(thunkDeleteImages(threadId)))
      .then(() => navigate('/'));
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
          ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="editThread-Title"
            name="title"
            required
          ></input>

          {currUser?.id === thread.user_id &&
            <button
              className="editThread-SubmitBtn clickable"
              type="submit"
            ><i className="fa-solid fa-check"></i></button>
          }
        </div>

        <textarea
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="editThread-Desc"
          name="desc"
          required
        ></textarea>
      </form >

      <div className="alignCenterDiv">
        <div className="editThread-DeleteBtnDiv">
          <button
            className="editThread-DeleteBtn clickable"
            onClick={handleDelete}
          ><i className="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    </>
  )
}

export default EditThread;
