import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetComments } from '../../redux/comments';
import OpenModalButton from '../../components/OpenModalButton';
import EditCommentModal from './EditComment/EditCommentModal';
import './Comments.css';
import LikeButton from '../LikeButton';
import formatDate from '../../functions/formatDate';

function Comments() {
  const dispatch = useDispatch();
  const { threadId } = useParams();

  const user = useSelector((state) => state.session.user);
  const comments = Object.values(useSelector((state) => state.comments));

  useEffect(() => {
    dispatch(thunkGetComments(threadId));
  }, [dispatch, threadId]);


  return (
    <div className='commentsWrapper'>
      <div className="commentsHeader">
        <i className="fa-regular fa-comment"></i>
        &nbsp;
        {comments.length}
      </div>

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
            <LikeButton comment={comment} />
          </div>
        </div>
      )
      }
    </div >
  )
}

export default Comments;
