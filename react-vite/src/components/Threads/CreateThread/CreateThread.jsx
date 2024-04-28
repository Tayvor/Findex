import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateThread } from "../../../redux/threads";
import { thunkUploadImage } from "../../../redux/images";
import { useModal } from "../../../context/Modal";
import './CreateThread.css';


function CreateThread({ communityId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imageSRC, setImageSRC] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [hoveringImage, setHoveringImage] = useState(false);

  useEffect(() => {
    if (image) {
      setImageSRC(() => URL.createObjectURL(image))
    }

    return () => URL.revokeObjectURL(imageSRC)
  }, [image, imageSRC])


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
    setImage(null);
    setImageSRC("");
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

      {imageSRC ? '' : <div>Add an Image</div>}
      {imageSRC ? '' :
        <label
          className="uploadImageBtn clickable"
        >
          <i className="fa-regular fa-image"></i>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
        </label>
      }

      {imageSRC &&
        <div
          className="createThread-ImageCtn"
          onMouseEnter={() => setHoveringImage(true)}
          onMouseLeave={() => setHoveringImage(false)}
        >
          <img
            className='createThread-ImagePreview clickable'
            src={imageSRC}
            onClick={removeImage}
          ></img>

          <div
            className="removeImage"
          >Remove Image</div>
        </div>
      }
    </form>
  )
}

export default CreateThread;
