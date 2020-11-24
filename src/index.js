
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Modal = ({show, close}) => {
  return (
    <div className="modalWrapper">
      style={{opacity: show ? '1' : '0'}}
      <div className="modalHeader">
        <p>Welcome to Out Site</p>
        <span onClick={close}className="closeModalButton">X</span>
      </div>
      <div className="modalContent">
        <div className="modalBody">
          <h4>Modal</h4>
          <p>modal content stuff</p> 
        </div>
        <div className="modalFooter">
          <button onClick={close}className="buttonCancel">Close</button>
        </div>
      </div>
    </div>
  )
}


function ListUsers(props){
  const users = props.users;
  const listUsers = users.map(user =>
    {
      return <div className = "list" key={user.key}>
        <p>{user.text}
        <span> 
          <button onClick={ ()=> props.deleteUser(user.key)}>
             X
          </button>
        </span>
        </p>
      </div>
    })
  return (
    <div>{listUsers}</div>
  )
}

function Ass() {
  const [show, setShow]= useState(false);

  const closeModalHandler = () => setShow(false);
}

class Site extends React.Component {
  constructor (props) {
    super (props);
    this.state ={ 
      users: [],
      currentUser: {
        text:'',
        key:''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  handleInput(e) {
    this.setState({
      currentUser: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addUser(e) {
    e.preventDefault();
    const newUser = this.state.currentUser;
    console.log(newUser);
    if (newUser.text!=="") {
      const newUsers = [...this.state.users, newUser];
      this.setState({
        users: newUsers,
        currentUser:{
          text:'',
          key:'',
        }
      })
    }
  }

  deleteUser(key){
    const filteredUsers = this.state.users.filter(user => user.key!==key);
    this.setState({users:filteredUsers})
  }

  render() {
    return (
      <div className="Site">
        {show ? <div className="backDrop"></div> : null}
        <button onClick={() =>setShow(true)} className="buttonOpenModal">Open Modal</button>
        <Modal show={show} close={closeModalHandler}/>
          <form id="userForm" onSubmit={this.addUser}>
            <input type="text" placeholder="Enter Text"
            value={this.state.currentUser.text}
            onChange={this.handleInput}/>
            <button type="submit">Add User</button>
          </form>
        <ListUsers users = {this.state.users}
        deleteUser = {this.deleteUser}/>
        </div>
    );
  }
}


ReactDOM.render(<Site/>, document.getElementById('root'));
  