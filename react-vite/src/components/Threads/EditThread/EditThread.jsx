import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteThread, thunkEditThread } from "../../../redux/threads";
import { thunkDeleteImages, thunkUploadImage } from "../../../redux/images";
import './EditThread.css';
import { useModal } from "../../../context/Modal";


function EditThread({ threadId, goBack, threadImages }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const thread = useSelector((state) => state.threads[threadId]);
  const [title, setTitle] = useState(thread?.title);
  const [description, setDesc] = useState(thread?.description);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(threadImages[0] || null);
  const [imagePreview, setImagePreview] = useState(threadImages[0]?.url || null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
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
    const formInfo = {
      'title': title,
      'description': description,
      'community_id': thread.community_id,
    };

    dispatch(thunkEditThread(formInfo, threadId))

    if (!image && threadImages[0]) {
      const fileName = threadImages[0].url.split('/')[3];
      dispatch(thunkDeleteImages(fileName))
        .then(() => closeModal());
    } else {
      closeModal();
    }

    //   const formData = new FormData();
    //   formData.append('image', image);
    //   formData.append('thread_id', threadId);

    //   dispatch(thunkUploadImage(formData))
    //     .then(() => closeModal());
    // } else {
    //   closeModal();
    // }
  };

  const handleDelete = (e) => {
    e.preventDefault()
    goBack()

    dispatch(thunkDeleteThread(threadId))
      .then(() => dispatch(thunkDeleteImages(threadId)))
      .then(() => closeModal())
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
    <>
      <form
        className="editThread-Form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}

        <div className="editThread-Header">
          <button
            className="editThread-DeleteBtn clickable"
            onClick={(e) => handleDelete(e)}
          ><i className="fa-regular fa-trash-can"></i></button>

          <div style={{ 'fontSize': 30 }}>Edit Your Thread</div>

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


        {!image &&
          <div className="editThread-AddImage">Upload Image
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
            className="editThread-ImageCtn"
            onClick={removeImage}
          >
            <img
              className="editThread-Image"
              src={imagePreview}
            ></img>

            <div
              className="removeImageText"
            >Remove Image</div>
          </div>
        }
      </form >
    </>
  )
}

export default EditThread;
