import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateThread } from "../../../redux/threads";
import { thunkUploadImage } from "../../../redux/images";
import { useModal } from "../../../context/Modal";
import './CreateThread.css';


function CreateThread() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.session.user.id);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(false);
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
    // First, create a new thread.
    const formInfo = {
      'title': title,
      'description': description,
      'user_id': userId,
    };

    const res = await dispatch(thunkCreateThread(formInfo));

    // Second, grab new thread id, and post the image.
    if (res && image) {
      setLoading(true);
      const threadId = res.id;

      const formData = new FormData();
      formData.append('image', image);
      formData.append('thread_id', threadId);

      dispatch(thunkUploadImage(formData))
        .then(() => closeModal());

    } else {
      closeModal();
    }
  };


  return (
    <form
      className="createThread-Form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="createThread-Header">
        <button
          className="createThread-BackBtn clickable"
          onClick={() => closeModal()}
          disabled={loading}
        ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

        <input
          className="createThread-Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>

        <button
          className="createThread-SubmitBtn clickable"
          type="submit"
          disabled={loading}
        ><i className="fa-solid fa-check"></i></button>
      </div>
      {errors.title && <p className="error">{errors.title}</p>}
      {loading && <p>Loading... please wait.</p>}
      {errors.description && <p className="error">{errors.description}</p>}
      <textarea
        className="createThread-Desc"
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        required
      ></textarea>

      Add Image
      <label
        className="uploadImageBtn clickable"
      ><i className="fa-regular fa-image"></i>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
      </label>
      {image && <p>Image Attached!</p>}

    </form>
  )
}

export default CreateThread;
