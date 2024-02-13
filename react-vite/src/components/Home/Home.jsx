// import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Threads from "../Threads";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './Home.css';
import CreateThread from "../Threads/CreateThread";

function Home() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);


  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <div className="homeHeader-Left">
          <div>THREADS</div>
        </div>

        <OpenModalButton
          modalComponent={<CreateThread />}
          buttonText={<i className="fa-solid fa-plus"></i>}
          className='homeHeader-NewThreadBtn clickable'
        />
      </div>

      <div className="homeContent">
        <Threads />
      </div>
    </div>
  )
}

export default Home;
