import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkAddImage, thunkCreateThread } from "../../../redux/threads";
import './CreateThread.css'



function CreateThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [img, setImg] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  const userId = useSelector((state) => state.session.user.id);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img) {
      const formData = new FormData();
      formData.append("image", img);
      setImgLoading(true);
      await dispatch(thunkAddImage(formData));
      navigate("/");

    } else {
      const formInfo = {
        'title': title,
        'description': description,
        'user_id': userId,
      };

      dispatch(thunkCreateThread(formInfo))
        .then(() => navigate('/'));
    }
  };


  return (
    <form className="createThread-Form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="createThread-Header">
        <button
          className="createThread-BackBtn clickable"
          onClick={() => navigate('/')}
        ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

        <input
          className="createThread-Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

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
      ></textarea>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e.target.files[0])}
      ></input>
    </form>
  )
}

export default CreateThread;
