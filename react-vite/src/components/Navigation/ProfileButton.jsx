import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import './ProfileButton.css';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    // Keep from bubbling up to document and triggering closeMenu
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="profileBtn clickable"
      >
        <i className="fa-regular fa-user"></i>
      </button>


      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <div>{`Hello, ${user.username}`}</div>
              <div>{user.email}</div>
              <button className='clickable' onClick={logout}>Log Out</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
