import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './CreateThread.css'
import { thunkCreateThread } from "../../../redux/threads";



function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const userId = useSelector((state) => state.session.user.id);

  const back = '<'

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInfo = {
      'title': title,
      'description': description,
      'user_id': userId,
    };

    dispatch(thunkCreateThread(formInfo));
  };


  return (
    <form className="createThread-Form" onSubmit={handleSubmit}>
      <div className="createThread-Header">
        <button
          className="createThread-BackBtn clickable"
          onClick={() => navigate('/')}
        >{back}</button>

        <input
          className="createThread-Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <button
          className="createThread-SubmitBtn clickable"
          type="submit"
        >+</button>
      </div>

      <textarea
        className="createThread-Desc"
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
    </form>
  )
}

export default CreateThread;
