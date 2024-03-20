import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Communities from "../Communities";
import Threads from "../Threads";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateThread from "../Threads/CreateThread";
import './Base.css';
import { thunkGetCommunities } from "../../redux/communities";


function Base() {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.session.user);

  const [communityId, setCommunityId] = useState(0);
  const [threadId, setThreadId] = useState(0);

  useEffect(() => {
    dispatch(thunkGetCommunities());
  }, [dispatch]);

  return (
    <div className="grid" id="homeCtn">
      <div className="gridLeft" id="gridLeft"></div>

      <div className="gridMiddle">
        <Communities />
        {/* <Threads /> */}
      </div>

      <div className="gridRight">
        {userLoggedIn &&
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
