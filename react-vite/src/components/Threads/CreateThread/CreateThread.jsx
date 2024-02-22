import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { thunkCreateThread } from "../../../redux/threads";
import { thunkUploadImage } from "../../../redux/images";
import { useModal } from "../../../context/Modal";
import './CreateThread.css';


function CreateThread() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const userId = useSelector((state) => state.session.user.id);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, create a new thread.
    const formInfo = {
      'title': title,
      'description': description,
      'user_id': userId,
    };

    const res = await dispatch(thunkCreateThread(formInfo));

    // Second, grab new thread id, and post the image.
    if (res && image) {
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
        ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

        <input
          className="createThread-Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></input>
        {errors.title && <p>{errors.title}</p>}

        <button
          className="createThread-SubmitBtn clickable"
          type="submit"
        ><i className="fa-solid fa-check"></i></button>
      </div>

      <textarea
        className="createThread-Desc"
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        required
      ></textarea>
      {errors.description && <p>{errors.description}</p>}

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

    </form>
  )
}

export default CreateThread;
