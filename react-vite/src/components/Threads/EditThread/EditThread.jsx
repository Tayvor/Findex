import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteThread, thunkEditThread } from "../../../redux/threads";
import { thunkDeleteImages } from "../../../redux/images";
import './EditThread.css';
import { useModal } from "../../../context/Modal";


function EditThread({ threadId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const thread = useSelector((state) => state.threads[threadId]);
  const [title, setTitle] = useState(thread?.title);
  const [description, setDesc] = useState(thread?.description);
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errors = {};

    // Validations
    if (title.length < 10 || title.length > 30) {
      errors.title = 'Title must be between 10 and 30 characters.'
    } else if (!title.trim()) {
      errors.title = 'Title must not contain entirely whitespace.'
    }

    if (description.length < 10) {
      errors.description = 'Description must be at least 10 characters.'
    }

    if (Object.values(errors).length) {
      return setErrors(errors);
    }


    // Form Submission
    const formInfo = {
      'title': title,
      'description': description,
      'community_id': thread.community_id,
    };

    dispatch(thunkEditThread(formInfo, threadId))
      .then(() => closeModal())
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteThread(threadId))
      .then(() => dispatch(thunkDeleteImages(threadId)))
  };


  return (
    <>
      <form className="editThread-Form" onSubmit={handleSubmit}>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}

        <div className="editThread-Header">
          <button
            className="editThread-DeleteBtn clickable"
            onClick={handleDelete}
          ><i className="fa-regular fa-trash-can"></i></button>

          <div>Edit Thread</div>

          <button
            className="editThread-SubmitBtn clickable"
            type="submit"
          ><i className="fa-solid fa-check"></i></button>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="editThread-Title"
          name="title"
          required
        ></input>
        {errors.title && <p className="error">{errors.title}</p>}

        <textarea
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="editThread-Desc"
          name="desc"
          required
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}
      </form >
    </>
  )
}

export default EditThread;
