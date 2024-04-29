import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteThread, thunkEditThread } from "../../../redux/threads";
import { thunkDeleteImage, thunkUploadImage } from "../../../redux/images";
import { useModal } from "../../../context/Modal";
import './EditThread.css';


function EditThread({ threadId, goBack, threadImage }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const thread = useSelector((state) => state.threads[threadId]);
  const [title, setTitle] = useState(thread?.title);
  const [description, setDesc] = useState(thread?.description);
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(threadImage?.image_url || null);


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


    // Update Thread
    const threadInfo = {
      'title': title,
      'description': description,
      'community_id': thread.community_id,
    };
    dispatch(thunkEditThread(threadInfo, threadId))

    // Update Image
    if (newImage) {
      if (threadImage) {
        const fileName = threadImage.image_url.split('/')[3];
        dispatch(thunkDeleteImage(fileName));
      }
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('thread_id', threadId);
      dispatch(thunkUploadImage(formData));
      closeModal();
    } else {
      if (threadImage) {
        const fileName = threadImage.image_url.split('/')[3];
        dispatch(thunkDeleteImage(fileName));
        closeModal();
      }
      return;
    }
  };

  const handleDelete = (e) => {
    e.preventDefault()
    goBack()

    if (threadImage) {
      const fileName = threadImage.image_url.split('/')[3];
      dispatch(thunkDeleteImage(fileName))
    }
    dispatch(thunkDeleteThread(threadId));
    closeModal()
  };

  const removeImage = () => {
    URL.revokeObjectURL(imagePreview)
    setNewImage(null);
    setImagePreview(null);
    return;
  }

  const selectImage = (e) => {
    setNewImage(e.target.files[0]);
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


        {!imagePreview &&
          < div className="editThread-AddImage">Upload Image
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

        {imagePreview &&
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
