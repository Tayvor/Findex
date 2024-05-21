import OpenModalButton from '../OpenModalButton';
import CreateCommentModal from '../Comments/CreateComment/CreateCommentModal';
import CreateThread from '../Threads/CreateThread';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';


function NavBar({ threadId }) {
  const { communityId } = useParams();
  const community = useSelector((state) => state.communities[communityId].name);
  const navigate = useNavigate();

  const goBack = () => {
    if (!threadId) {
      navigate('/')
    } else {
      navigate(`/communities/${communityId}`);
    }
  }


  return (
    <>
      <div className="navBarWrapper">

        <div className="navBar">
          <button
            className="backBtn clickable"
            onClick={goBack}
          ><i className="fa-solid fa-chevron-up fa-rotate-270"></i>
          </button>

          <div className="communityName">{community}</div>

          <OpenModalButton
            className={'createBtn clickable'}
            modalComponent={!threadId ?
              <CreateThread /> : <CreateCommentModal />
            }
            buttonText={!threadId ?
              <i className="fa-solid fa-plus"></i> :
              <i className="fa-regular fa-comment"></i>
            }
          />

          {/*
        className={userLoggedIn ? 'createBtn clickable' : 'createBtnDisabled'}
        disabled={userLoggedIn ? false : true}
        */}
        </div>
      </div>
    </>
  )
}

export default NavBar;
