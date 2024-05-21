import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkCreateThread } from "../../../redux/threads";
import { thunkUploadImage } from "../../../redux/images";
import { useModal } from "../../../context/Modal";
import './CreateThread.css';


function CreateThread() {
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const { closeModal } = useModal();

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(false);
    const errors = {};

    // Validations
    if (title.length < 1 || title.length > 30) {
      errors.title = 'Title must be between 1 and 30 characters.'
    } else if (!title.trim()) {
      errors.title = 'Title must not contain entirely whitespace.'
    }

    if (description.length < 1) {
      errors.description = 'Description must be at least 1 character.'
    }

    if (Object.values(errors).length) {
      return setErrors(errors);
    }

    // Form Submission
    // First, create a new thread.
    const formInfo = {
      'title': title,
      'description': description,
      'community_id': communityId,
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

  const removeImage = () => {
    URL.revokeObjectURL(imagePreview)
    setImage(null);
    setImagePreview(null);
    return;
  }

  const selectImage = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    return;
  }


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

        <div className="createThread-HeaderTitle">Create a Thread</div>

        <button
          className="createThread-SubmitBtn clickable"
          type="submit"
          disabled={loading}
        ><i className="fa-solid fa-check"></i></button>
      </div>

      {errors.title && <p className="error">{errors.title}</p>}
      {loading && <p>Loading... please wait.</p>}
      {errors.description && <p className="error">{errors.description}</p>}

      <input
        className="createThread-Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      ></input>

      <textarea
        className="createThread-Desc"
        placeholder="Description"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        required
      ></textarea>

      {!image &&
        <div className="addImage">Upload Image
          <label
            className="uploadImageBtn clickable"
          >
            <i className="fa-regular fa-image"></i>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => selectImage(e)}
              hidden
            />
          </label>
        </div>
      }

      {image &&
        <div
          className="createThread-ImageCtn"
          onClick={removeImage}
        >
          <img
            className='createThread-ImagePreview'
            src={imagePreview}
          ></img>

          <div className="textOverlay">
            Remove Image
          </div>
        </div>
      }
    </form>
  )
}

export default CreateThread;
