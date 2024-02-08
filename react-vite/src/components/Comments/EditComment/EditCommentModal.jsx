import { useState } from "react";
import './EditCommentModal.css'
import { useDispatch, useSelector } from "react-redux";
import { thunkEditComment } from "../../../redux/comments";
import { useModal } from "../../../context/Modal";


function EditCommentModal({ threadId, content, commentId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(content);
  const { closeModal } = useModal();

  const currUser = useSelector((state) => state.session.user);


  const handleSubmit = (e) => {
    e.preventDefault();

    const formInfo = {
      'content': comment,
      'user_id': currUser.id,
      'thread_id': Number(threadId),
    }

    dispatch(thunkEditComment(formInfo, commentId))
      .then(() => closeModal())
  }

  return (
    <form className="editComment-Form" onSubmit={handleSubmit}>
      <h2>Edit Your Comment</h2>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="editComment-Textarea"
      ></textarea>

      <button
        className="editComment-SubmitBtn clickable"
        type="submit"
      >=</button>

    </form>
  );
}

export default EditCommentModal;
