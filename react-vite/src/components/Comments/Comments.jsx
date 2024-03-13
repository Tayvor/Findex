import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetComments } from '../../redux/comments';
import { thunkCreateLike } from '../../redux/likes';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import EditCommentModal from './EditComment/EditCommentModal';
import './Comments.css';

function Comments({ threadId, currUser }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetComments(threadId));
  }, [dispatch, threadId])

  const comments = Object.values(useSelector((state) => state.comments));
  const currUserLikes = useSelector((state) => state.currUserLikes);

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
    <div className='commentsContainer'>

      {comments.map((comment) =>
        <div
          className='commentBox'
          key={'comment' + comment.id}
        >

          <div className="commentInfo">
            <div className='commentInfo-Left'>
              <div
                className='commentInfo-Username'
              >{comment.user.username}</div> &bull;

              <div>{getTime(comment.created_at)}</div> &bull;

              {currUser && currUser.id !== comment.user_id ?
                <div
                  onClick={() => {
                    comment.num_likes += 1;
                    dispatch(thunkCreateLike('comment', comment.id));
                  }}
                  className="commentInfo-Likes clickable"
                >
                  {currUserLikes.commentLikes[comment.id] ?
                    <i className="fa-solid fa-arrow-up liked"></i>
                    :
                    <i className="fa-solid fa-arrow-up"></i>
                  }
                  &nbsp;
                  {comment.num_likes}
                </div>
                :
                <div
                  className="commentInfo-Likes"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                  &nbsp;
                  {comment.num_likes}
                </div>
              }
            </div>

            {currUser?.id === comment.user_id && (
              < OpenModalButton
                modalComponent={
                  <EditCommentModal
                    threadId={threadId}
                    content={comment.content}
                    commentId={comment.id} />
                }
                buttonText='edit'
                className='commentBox-EditBtn clickable'
              />
            )}
          </div>

          <div>{comment.content}</div>
        </div>
      )}
    </div>
  )
}

export default Comments;
