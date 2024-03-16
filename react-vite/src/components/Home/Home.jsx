import { useSelector } from "react-redux";
import Threads from "../Threads";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateThread from "../Threads/CreateThread";
import './Home.css';


function Home() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <div className="homeHeader-Left">
          <div>THREADS</div>
        </div>

        {user &&
          <OpenModalButton
            modalComponent={<CreateThread />}
            buttonText={<i className="fa-solid fa-plus"></i>}
            className='homeHeader-NewThreadBtn clickable'
          />
        }
      </div>

      <div className="homeContent">
        <Threads />
      </div>
    </div>
  )
}

export default Home;
