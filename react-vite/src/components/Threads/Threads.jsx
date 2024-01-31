import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetThreads } from "../../redux/threads";


function Threads() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(thunkGetThreads())
      .then(() => setLoaded(true))
  }, [dispatch]);

  const threads = Object.values(useSelector((state) => state.threads));

  return (
    <>
      <h2>Threads:</h2>

      {threads.map((thread) =>
        <div key={thread.id}>
          <div>{thread.title}</div>
        </div>
      )}
    </>
  )
}

export default Threads;
