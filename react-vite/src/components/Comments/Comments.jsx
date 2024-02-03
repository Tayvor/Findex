import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetComments } from '../../redux/comments'
import './Comments.css';


function Comments({ threadId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetComments(threadId))
  })

  const comments = Object.values(useSelector((state) => state.comments));

  return (
    <div className='commentsContainer'>
      {comments.map((comment) =>
        <div className='commentBox' key={comment.id}>{comment.content}</div>
      )}
    </div>
  )
}

export default Comments;
