import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Communities from "../Communities";
import './Base.css';
import { thunkGetCommunities } from "../../redux/communities";


function Base() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetCommunities());
  }, [dispatch]);

  return (
    <div className="grid">
      <div className="gridLeft" id="gridLeft"></div>

      <div className="gridMiddle">
        <Communities />
      </div>

      <div className="gridRight"></div>
    </div>
  )
}

export default Base;
