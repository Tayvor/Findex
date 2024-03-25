import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetThreads } from "../../redux/threads";
import { thunkGetUserLikes } from "../../redux/likes";
import './Threads.css';
import UserModal from "./UserModal";
import { createPortal } from 'react-dom';


function Threads({ communityId, viewThread }) {
  const dispatch = useDispatch();
  const [viewingUser, setViewingUser] = useState(-1);

  const communityThreads = Object.values(useSelector((state) => state.threads)).filter(
    (thread) => thread.community_id === communityId
  );
  const currUser = useSelector((state) => state.session.user);
  const currUserLikes = useSelector((state) => state.currUserLikes);

  useEffect(() => {
    dispatch(thunkGetThreads());
    if (currUser) {
      dispatch(thunkGetUserLikes());
    }
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

  const threads = communityThreads.map((thread) =>
    <div key={thread.id} className="threadBox">

      <div className="threadBox-Left">
        <div
          className="threadTitle clickable"
          onClick={() => viewThread(thread.id)}
        >{thread.title}</div>

        <div className="threadInfo">
          <div
            className="threadInfo-Username"
            onMouseEnter={() => setViewingUser(thread.id)}
            onMouseLeave={() => setViewingUser(-1)}
          >{thread.user.username}</div> &bull;

          <div
            className="threadInfo-Time"
          >{getTime(thread.created_at)}</div> &bull;

          <div
            className="threadInfo-NumComments"
          >
            {" "}
            <i className="fa-regular fa-comment"></i>
            {" "}
            {thread.num_comments}
          </div> &bull;

          <div
            className="threadInfo-NumLikes"
          >
            {" "}
            {currUser && currUserLikes.threadLikes[thread.id] ?
              <i className="fa-solid fa-arrow-up liked"></i>
              :
              <i className="fa-solid fa-arrow-up"></i>
            }
            {" "}
            {thread.num_likes}
          </div>
        </div>
      </div>

      {viewingUser === thread.id &&
        createPortal(<UserModal user={thread.user} />,
          document.getElementById('gridLeft'))
      }
    </div>
  )


  return <>{threads}</>
}

export default Threads;
