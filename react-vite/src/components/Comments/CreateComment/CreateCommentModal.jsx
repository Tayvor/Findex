import { useState } from "react";
import './CreateCommentModal.css'
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment, thunkGetComments } from "../../../redux/comments";


function CreateCommentModal({ threadId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const currUser = useSelector((state) => state.session.user);


  const handleSubmit = (e) => {
    e.preventDefault();

    const formInfo = {
      'content': comment,
      'user_id': currUser.id,
      'thread_id': Number(threadId),
    }

    dispatch(thunkCreateComment(formInfo))
      .then(() => thunkGetComments(threadId))
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
      >=</button>

    </form>
  );
}

export default CreateCommentModal;
