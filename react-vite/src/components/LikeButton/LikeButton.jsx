import { useSelector, useDispatch } from "react-redux";
import { thunkCreateLike, thunkDeleteLike } from "../../redux/likes";
import './LikeButton.css';


function LikeButton({ comment }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userLikes = useSelector((state) => state.currUserLikes);

  const handleLike = (comment) => {
    if (!userLikes.commentLikes[comment.id]) {
      comment.num_likes += 1;
      dispatch(thunkCreateLike('comment', comment.id));
    } else {
      comment.num_likes -= 1;
      dispatch(thunkDeleteLike(userLikes.commentLikes[comment.id]));
    }
  }

  return (
    <>
      {/* No user logged in. */}
      {!user &&
        <div className='commentInfo-Likes'>
          <i className="fa-solid fa-arrow-up"></i>
          &nbsp;
          {comment.num_likes}
        </div>
      }

      {/* User logged in, but is not the author. */}
      {user && user.id !== comment.user.id &&
        <div
          className={userLikes.commentLikes[comment.id] ?
            "commentInfo-Likes isLiked clickable" : "commentInfo-Likes notLiked clickable"
          }
          onClick={() => handleLike(comment)}
        >
          {userLikes.commentLikes[comment.id] ?
            <i className="fa-solid fa-arrow-up liked"></i>
            :
            <i className="fa-solid fa-arrow-up"></i>
          }
          &nbsp;
          {comment.num_likes}
        </div>
      }

      {/* User logged in, and is the author. */}
      {user && user.id === comment.user.id &&
        <div className='commentInfo-Likes'>
          <i className="fa-solid fa-arrow-up"></i>
          &nbsp;
          {comment.num_likes}
        </div>
      }
    </>
  )
}

export default LikeButton;
