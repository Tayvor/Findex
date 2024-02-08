// import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import './ThreadDetails.css';
import Comments from "../../Comments";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateCommentModal from '../../Comments/CreateComment/CreateCommentModal';


function ThreadDetails() {
  const navigate = useNavigate();
  const { threadId } = useParams();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user)
  const back = '<'


  return (thread &&
    <>
      < div className="threadDetails-Container">
        < div className="threadDetails-Header">
          <button
            className="threadDetails-BackBtn clickable"
            onClick={() => navigate('/')}
          >{back}</button>

          <div
            className="threadDetails-Title"
          >{thread.title}</div>

          {currUser && (
            < OpenModalButton
              modalComponent={<CreateCommentModal threadId={threadId} />}
              buttonText='+'
              className='threadDetails-ReplyBtn clickable'
            />
          )}

          {!currUser && <button className="hiddenBtn"></button>}
        </div >

        <div className="threadDetails-Desc">
          <p>{thread.description}</p>
        </div>

        {currUser?.id === thread.user_id ?
          <button
            className="threadDetails-EditBtn clickable"
            onClick={() => navigate(`/threads/${threadId}/edit`)}
          >:</button>
          :
          ''
        }
      </div >
      <Comments threadId={threadId} />
    </>
  )
}

export default ThreadDetails;
