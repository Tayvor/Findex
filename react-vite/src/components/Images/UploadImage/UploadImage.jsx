import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkUploadImage } from "../../../redux/images";
import './UploadImage.css';


function UploadImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const userId = useSelector((state) => state.session.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      dispatch(thunkUploadImage(formData))
        .then(() => navigate('/'));
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form
      className="uploadImage-Form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="uploadImage-FormSubmitBtn" type="submit">
        Upload Image
      </button>

    </form>
  )
}

export default UploadImage;
