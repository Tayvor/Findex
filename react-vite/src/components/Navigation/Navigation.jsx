import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";

function Navigation() {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.session.user);

  return (
    <div className="navContainer">
      <h1
        onClick={() => navigate('/')}
        className="clickable"
      >FINDEX</h1>

      {currUser &&
        <div className="profileBtn">
          <ProfileButton />
        </div>
      }

      {!currUser &&
        <OpenModalButton
          modalComponent={<LoginFormModal />}
          buttonText={'Login'}
          className='homeHeader-LoginBtn clickable'
        />
      }
    </div>
  );
}

export default Navigation;
