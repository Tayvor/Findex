import { useState } from "react";
// import { useDispatch } from "react-redux";


function CreateCommentModal() {
  // const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('submit me!!')
  }

  return (
    <form className="createComment-Form" onSubmit={handleSubmit}>

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="createComment-Comment"
      ></input>

    </form>
  );
}

export default CreateCommentModal;
