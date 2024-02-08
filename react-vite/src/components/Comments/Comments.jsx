import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetComments } from '../../redux/comments';
import './Comments.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import EditCommentModal from './EditComment/EditCommentModal';

function Comments({ threadId, currUser }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetComments(threadId));
  }, [dispatch, threadId])

  const comments = Object.values(useSelector((state) => state.comments));

  return (
    <div className='commentsContainer'>
      {comments.map((comment) =>
        <div
          className='commentBox'
          key={'comment' + comment.id}
        >
          <div className='username'>{comment.user.username}</div>
          <div>{comment.content}</div>

          {currUser?.id === comment.user_id && (
            < OpenModalButton
              modalComponent={
                <EditCommentModal
                  threadId={threadId}
                  content={comment.content}
                  commentId={comment.id} />
              }
              buttonText={<i className="fa-regular fa-pen-to-square"></i>}
              className='commentBox-EditBtn clickable'
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Comments;
