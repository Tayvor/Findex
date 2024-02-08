import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment } from "../../../redux/comments";
import { useModal } from "../../../context/Modal";
import './CreateCommentModal.css';


function CreateCommentModal({ threadId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const { closeModal } = useModal();

  const currUser = useSelector((state) => state.session.user);


  const handleSubmit = (e) => {
    e.preventDefault();

    const formInfo = {
      'content': comment,
      'user_id': currUser.id,
      'thread_id': Number(threadId),
    }

    dispatch(thunkCreateComment(formInfo))
      .then(() => closeModal())
  }

  return (
    <form className="createComment-Form" onSubmit={handleSubmit}>
      <h2>Create a Comment</h2>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="createComment-Textarea"
      ></textarea>

      <button
        className="createComment-SubmitBtn clickable"
        type="submit"
      ><i className="fa-solid fa-check"></i></button>

    </form>
  );
}

export default CreateCommentModal;
