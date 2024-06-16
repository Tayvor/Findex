import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkCreateComment } from "../../../redux/comments";
import { useModal } from "../../../context/Modal";
import './CreateCommentModal.css';


function CreateCommentModal() {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { closeModal } = useModal();
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      'content': comment,
      'thread_id': Number(threadId),
    }
    dispatch(thunkCreateComment(data))
      .then(() => closeModal())
  }

  return (
    <form className="createComment-Form" onSubmit={handleSubmit}>

      <div className="createComment-Header">
        <button
          className="createComment-BackBtn clickable"
          onClick={() => closeModal()}
        ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

        <div className="createComment-Title">Create a Comment</div>

        <button
          className="createComment-SubmitBtn clickable"
          type="submit"
        ><i className="fa-solid fa-check"></i></button>
      </div>

      <textarea
        className="createComment-Textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Hmm..."
        required
      ></textarea>
    </form>
  );
}

export default CreateCommentModal;
