import { useSelector } from 'react-redux';
import './Communities.css';


function Communities() {
  const communities = Object.values(useSelector((state) => state.communities));



  return (
    <>
      {communities.map((community) =>
        <div
          key={community.id}
          className='communityBox'
        >
          <div>{community.name}</div>
          <div>{community.description}</div>
        </div>
      )}
    </>
  )
};

export default Communities;
