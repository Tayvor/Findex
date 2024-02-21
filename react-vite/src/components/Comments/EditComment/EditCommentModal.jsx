import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditComment, thunkDeleteComment } from "../../../redux/comments";
import { useModal } from "../../../context/Modal";
import './EditCommentModal.css'


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

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(thunkDeleteComment(commentId))
      .then(() => closeModal())
  }

  return (
    <form className="editComment-Form" onSubmit={handleSubmit}>
      <div className="editComment-Header">
        <button
          className="editComment-DeleteBtn clickable"
          onClick={handleDelete}
        ><i className="fa-regular fa-trash-can"></i></button>

        <div className="editComment-Title">Edit Your Comment</div>

        <button
          className="editComment-SubmitBtn clickable"
          type="submit"
        ><i className="fa-solid fa-check"></i></button>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="editComment-Textarea"
        required
      ></textarea>
    </form>
  );
}

export default EditCommentModal;
