import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();


  return (
    <div className="navHeader">
      <h1
        onClick={() => navigate('/')}
        className="clickable"
      >FINDEX</h1>

      <div className="profileBtn">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
