import './UserModal.css';


function UserModal({ user }) {


  return (
    <div
      className='userModal'
    >{user.username}</div>
  )
}

export default UserModal;
