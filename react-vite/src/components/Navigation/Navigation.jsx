import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.session.user);

  return (
    <div className="navContainer">
      <h1
        onClick={() => navigate('/')}
        className="clickable"
      >FINDEX</h1>

      {currUser ?
        <ProfileButton />
        :
        <div>
          <span
            className="signup clickable"
            onClick={() => navigate('/signup')}
          >Sign Up!</span>

          <OpenModalButton
            modalComponent={<LoginFormModal />}
            buttonText={'Login'}
            className='loginBtn clickable'
          />
        </div>
      }
    </div>
  );
}

export default Navigation;
