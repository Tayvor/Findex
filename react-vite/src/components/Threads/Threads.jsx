import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetThreads } from "../../redux/threads";
import './Threads.css'


function Threads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(thunkGetThreads())
  }, [dispatch]);

  const threads = Object.values(useSelector((state) => state.threads));
  const user = useSelector((state) => state.session.user);


  return (
    <div
      className="threadsContainer"
    >
      <div className="threadsHeader">
        <select className="threadsFilter clickable">
          <option value='Threads' style={{ 'textAlign': 'center' }}
          >Threads</option>

          <option value='Photos' style={{ 'textAlign': 'center' }}
          >Photos</option>
        </select>

        <button
          className="newThreadBtn clickable"
          onClick={() => navigate('/create-thread')}
          hidden={user ? false : true}
        >+</button>
      </div>

      {threads.map((thread) =>
        <div
          key={thread.id}
          className="threadBox clickable"
          onClick={() => navigate(`/threads/${thread.id}`)}
        >
          <div className="threadTitle">{thread.title}</div>

          <div>IMG</div>
        </div>
      )}
    </div>
  )
}

export default Threads;
