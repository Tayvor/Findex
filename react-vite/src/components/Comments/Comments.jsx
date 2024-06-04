import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetComments } from '../../redux/comments';
import { thunkCreateLike, thunkDeleteLike } from '../../redux/likes';
import OpenModalButton from '../../components/OpenModalButton';
import EditCommentModal from './EditComment/EditCommentModal';
import './Comments.css';

function Comments() {
  const dispatch = useDispatch();
  const { threadId } = useParams();

  const user = useSelector((state) => state.session.user);
  const comments = Object.values(useSelector((state) => state.comments));
  const currUserLikes = useSelector((state) => state.currUserLikes);

  useEffect(() => {
    dispatch(thunkGetComments(threadId));
  }, [dispatch, threadId])

  const formatDate = (created_at) => {
    const ymd = created_at.split(' ')[0];
    let [year, month, day] = ymd.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month = months[Number(month) - 1]

    return `${month} ${day}, ${year}`;
  }

  const handleLike = (comment) => {
    if (!currUserLikes.commentLikes[comment.id]) {
      comment.num_likes += 1;
      dispatch(thunkCreateLike('comment', comment.id));
    } else {
      comment.num_likes -= 1;
      dispatch(thunkDeleteLike(currUserLikes.commentLikes[comment.id]));
    }
  }


  return (
    <div className='commentsWrapper'>

      {comments.map((comment) =>
        <div className='comment' key={comment.id}>
          <div className="commentInfo">
            <div>{comment.user.username}</div>
            <div>{formatDate(comment.created_at)}</div>

            {user?.id === comment.user.id && (
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

          <div className='commentInfo-Footer'>
            {user?.id !== comment.user.id ?
              <div
                className={currUserLikes.commentLikes[comment.id] ?
                  "commentInfo-Likes isLiked clickable" : "commentInfo-Likes notLiked clickable"
                }
                onClick={() => handleLike(comment)}
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
              <div className="commentInfo-Likes">
                <i className="fa-solid fa-arrow-up"></i>
                &nbsp;
                {comment.num_likes}
              </div>
            }
          </div>
        </div>
      )
      }
    </div >
  )
}

export default Comments;
