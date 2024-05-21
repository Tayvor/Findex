import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { thunkGetThreadImages } from "../../../redux/images";
// import { thunkCreateLike, thunkDeleteLike } from "../../../redux/likes";
// import OpenModalButton from "../../OpenModalButton";
import Comments from "../../Comments";
// import EditThread from '../EditThread';
import './ThreadDetails.css';
import NavBar from "../../NavBar";


function ThreadDetails() {
  const dispatch = useDispatch();
  const { threadId } = useParams();

  const thread = useSelector((state) => state.threads[threadId]);
  // const currUser = useSelector((state) => state.session.user);
  // const threadImage = useSelector((state) => state.images[threadId]);
  // const currUserLikes = useSelector((state) => state.currUserLikes);

  // useEffect(() => {
  // dispatch(thunkGetThreadImages(threadId));
  // }, [dispatch, threadId]);

  // const getTime = (created_at) => {
  //   const dateCreated = String(created_at).split(' ')[0].split('-');
  //   const timeCreated = String(created_at).split(' ')[1].slice(0, 8).split(':');

  //   const [yearCreated, monthCreated, dayCreated] = dateCreated;
  //   const [hourCreated, minuteCreated, secondCreated] = timeCreated;

  //   const oldDateTime = Date.UTC(
  //     Number(yearCreated),
  //     (Number(monthCreated) - 1),
  //     dayCreated,
  //     hourCreated,
  //     minuteCreated,
  //     secondCreated
  //   )

  //   const currDateTime = Date.now();
  //   const elapsedTime = currDateTime - oldDateTime;

  //   // let years = Math.floor(elapsedTime / (60000 * 60 * 24 * 365));
  //   // let months = Math.floor(elapsedTime / (60000 * 60 * 24 * 30));
  //   let days = Math.floor(elapsedTime / (60000 * 60 * 24));
  //   let hours = Math.floor(elapsedTime / (60000 * 60));
  //   let minutes = Math.floor(elapsedTime / 60000);

  //   if (days >= 1) {
  //     if (days === 1) {
  //       return `${days} day ago`;
  //     } else {
  //       return `${days} days ago`;
  //     }

  //   } else if (hours >= 1) {
  //     if (hours === 1) {
  //       return `${hours} hour ago`;
  //     } else {
  //       return `${hours} hours ago`;
  //     }

  //   } else if (minutes >= 1) {
  //     if (minutes === 1) {
  //       return `${minutes} minute ago`;
  //     } else {
  //       return `${minutes} minutes ago`;
  //     }

  //   } else {
  //     return 'A moment ago';
  //   }
  // };

  // const handleLike = (thread) => {
  //   if (!currUserLikes.threadLikes[thread.id]) {
  //     thread.num_likes += 1;
  //     dispatch(thunkCreateLike('thread', thread.id));
  //   } else {
  //     thread.num_likes -= 1;
  //     dispatch(thunkDeleteLike(currUserLikes.threadLikes[thread.id]));
  //   }
  // }

  return (
    <>
      <NavBar threadId={threadId} />

      <div className="displayFlex">
        {thread &&
          <div className="threadDetails">
            <div className="threadDetails-Title">{thread.title}</div>
            <div className="threadDetails-Desc">{thread.description}</div>

            <div className="threadDetails-Info">
              <div className="threadDetails-Author">{thread.user.username}</div>
            </div>
          </div>
        }
      </div>

      <Comments threadId={threadId} />

      {/* <div className="threadDetails-Container">

        {threadImage &&
          <img
            src={threadImage.image_url}
            className="threadDetails-Image"
          ></img>
        }
      </div>*/}
    </>
  )
}

export default ThreadDetails;
