import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../../Comments";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import CreateCommentModal from '../../Comments/CreateComment/CreateCommentModal';
import './ThreadDetails.css';


function ThreadDetails() {
  const navigate = useNavigate();
  const { threadId } = useParams();

  const thread = useSelector((state) => state.threads[threadId]);
  const currUser = useSelector((state) => state.session.user);


  return (thread &&
    <>
      < div className="threadDetails-Container">
        < div className="threadDetails-Header">
          <button
            className="threadDetails-BackBtn clickable"
            onClick={() => navigate('/')}
          ><i className="fa-solid fa-chevron-up fa-rotate-270"></i></button>

          <div
            className="threadDetails-Title"
          >{thread.title}</div>

          {currUser && (
            < OpenModalButton
              modalComponent={<CreateCommentModal threadId={threadId} />}
              buttonText={<i className="fa-regular fa-comment"></i>}
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
          ><i className="fa-regular fa-pen-to-square"></i></button>
          :
          ''
        }
      </div >
      <Comments threadId={threadId} currUser={currUser} />
    </>
  )
}

export default ThreadDetails;
