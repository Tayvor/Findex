import { useSelector } from "react-redux";
import Threads from "../Threads";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateThread from "../Threads/CreateThread";
import './Base.css';


function Base() {
  const loggedIn = useSelector((state) => state.session.user);

  return (
    <div className="grid" id="homeCtn">
      <div className="gridLeft" id="gridLeft"></div>

      <div className="gridMiddle">
        <Threads />
      </div>

      <div className="gridRight">
        {loggedIn &&
          <OpenModalButton
            modalComponent={<CreateThread />}
            buttonText={<i className="fa-solid fa-plus"></i>}
            className='newThreadBtn clickable'
          />
        }
      </div>
    </div>
  )
}

export default Base;
