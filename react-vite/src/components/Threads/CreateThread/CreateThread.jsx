import { useState } from "react";
import './CreateThread.css'



function CreateThread() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  return (
    <form className="createThread-Form">
      <h2>Create a Thread</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="createThread-Title"
      ></input>

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="createThread-Desc"
      ></textarea>

      <button
        type="submit"
        className="createThread-SubmitBtn clickable"
      >Submit</button>
    </form>
  )
}

export default CreateThread;
