import { useState } from "react";
import './CreateCommentModal.css'


function CreateCommentModal() {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInfo = {
      'comment': comment,
    }

    console.log('clicked')
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
