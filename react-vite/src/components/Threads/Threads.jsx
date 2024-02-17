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


  return (
    <div className="threadsContainer">
      {threads.map((thread) =>
        <div
          key={thread.id}
          className="threadBox clickable"
          onClick={() => navigate(`/threads/${thread.id}`)}
        >
          <div className="threadTitle">{thread.title}
            {thread.user &&
              <div className="threadInfo">
                <span>{thread.user.username}</span>
                <span> &bull; 3h ago</span>
                <span> &bull; <i className="fa-regular fa-comment"></i> 9</span>
              </div>
            }
          </div>

          <div>IMG</div>
        </div>
      )}
    </div>
  )
}

export default Threads;
