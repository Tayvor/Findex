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
      <div className="createComment-Header">
        <button
          className="createComment-BackBtn clickable"
          onClick={() => closeModal()}
        ><i className="fa-solid fa-x"></i></button>

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
      ></textarea>
    </form>
  );
}

export default CreateCommentModal;
