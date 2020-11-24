
import React, {} from 'react';
import ReactDOM from 'react-dom';
import './index.css';



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

class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <div class="modalContent">{this.props.children}</div>        
        <div>
          <button class="toggleButton" onClick={this.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
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


  state = {show:false};

  showModal = e => {
    this.setState({show:!this.state.show});
  };

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
        <h1>Hello World</h1>
        <button onClick={e => {this.showModal(e);}}>{""}show Modal{""}</button>
        <Modal  onClose={this.showModal} show={this.state.show}>
          <form id="userForm" onSubmit={this.addUser}>
            <input type="text" placeholder="Enter Text"
            value={this.state.currentUser.text}
            onChange={this.handleInput}/>
            <button type="submit">Add User</button>
          </form>
          <ListUsers users = {this.state.users}
          deleteUser = {this.deleteUser}/>
        </Modal>
        </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Site/>, rootElement);

  