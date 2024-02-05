import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetComments } from '../../redux/comments';
import './Comments.css';

function Comments({ threadId }) {
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
        </div>
      )}
    </div>
  )
}

export default Comments;
