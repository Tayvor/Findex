import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Threads from "../Threads";
import Images from '../Images';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const THREADS = 'THREADS';
  const IMAGES = 'IMAGES';
  const [view, setView] = useState(THREADS);

  const user = useSelector((state) => state.session.user);


  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <div className="homeHeader-Left">
          <div
            className={view === THREADS ? 'clickable' : 'notActive clickable'}
            onClick={() => setView(THREADS)}
          >THREADS</div>

          <div
            className={view === IMAGES ? 'clickable' : 'notActive clickable'}
            onClick={() => setView(IMAGES)}
          >IMAGES</div>
        </div>

        <button
          className={view === THREADS ? 'homeHeader-NewThreadBtn clickable' : 'homeHeader-NewImageBtn clickable'}
          onClick={() => { view === THREADS ? navigate('/new-thread') : navigate('/new-image') }}
          hidden={user ? false : true}
        ><i className="fa-solid fa-plus"></i></button>
      </div>

      <div className="homeContent">
        {view === THREADS && <Threads />}
        {view === IMAGES && <Images />}
      </div>
    </div>
  )
}

export default Home;
