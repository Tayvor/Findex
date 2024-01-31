import { useState } from "react";
import './CreateThread.css'



function CreateThread() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  return (
    <form
      className="createThreadForm"
    >
      <h2>Create a Thread</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="createThreadTitle"
      ></input>

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="createThreadDesc"
      ></textarea>

      <button
        type="submit"
        className="createThreadSubmitBtn clickable"
      >Submit</button>
    </form>
  )
}

export default CreateThread;
