import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetThreads } from "../../redux/threads";
import { thunkGetUserLikes } from "../../redux/likes";
import './Threads.css'


function Threads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const threads = Object.values(useSelector((state) => state.threads));
  const currUserLikes = Object.values(useSelector((state) => state.currUserLikes));


  useEffect(() => {
    dispatch(thunkGetThreads());
    dispatch(thunkGetUserLikes());
  }, [dispatch]);


  const getTime = (created_at) => {
    const dateCreated = String(created_at).split(' ')[0].split('-');
    const timeCreated = String(created_at).split(' ')[1].slice(0, 8).split(':');

    const [yearCreated, monthCreated, dayCreated] = dateCreated;
    const [hourCreated, minuteCreated, secondCreated] = timeCreated;

    const oldDateTime = Date.UTC(
      Number(yearCreated),
      (Number(monthCreated) - 1),
      dayCreated,
      hourCreated,
      minuteCreated,
      secondCreated
    )

    const currDateTime = Date.now();
    const elapsedTime = currDateTime - oldDateTime;

    // let years = Math.floor(elapsedTime / (60000 * 60 * 24 * 365));
    // let months = Math.floor(elapsedTime / (60000 * 60 * 24 * 30));
    let days = Math.floor(elapsedTime / (60000 * 60 * 24));
    let hours = Math.floor(elapsedTime / (60000 * 60));
    let minutes = Math.floor(elapsedTime / 60000);

    if (days >= 1) {
      if (days === 1) {
        return `${days} day ago`;
      } else {
        return `${days} days ago`;
      }

    } else if (hours >= 1) {
      if (hours === 1) {
        return `${hours} hour ago`;
      } else {
        return `${hours} hours ago`;
      }

    } else if (minutes >= 1) {
      if (minutes === 1) {
        return `${minutes} minute ago`;
      } else {
        return `${minutes} minutes ago`;
      }

    } else {
      return 'A moment ago';
    }
  }


  return (
    <div className="threadsContainer">
      {threads.map((thread) =>
        <div
          key={thread.id}
          className="threadBox"
        >
          <div className="threadBox-Left">
            <div
              className="threadTitle clickable"
              onClick={() => navigate(`/threads/${thread.id}`)}
            >{thread.title}</div>

            {thread.user &&
              <div className="threadInfo">
                <span
                // className="threadInfo-Username clickable"
                >{thread.user.username}</span>
                <span> &bull; {getTime(thread.created_at)}</span>
                <span> &bull;
                  {" "}
                  <i className="fa-regular fa-comment"></i>
                  {" "}
                  {thread.num_comments}
                </span>
                <span> &bull;
                  {" "}
                  <i
                    className="fa-solid fa-arrow-up"
                    style={{ color: 'rgb(91, 190, 91)' }}
                  ></i>
                  {" "}
                  {thread.num_likes}
                </span>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Threads;
