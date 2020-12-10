
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



function ListUsers(props){
  const users = props.users;
  const listUsers = users.map(user =>
    {
      return <div className = "list" key={user.key}>
        <p>{user.firstName}{user.lastName}
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
      <div className="modal" id="modal">
        <div className="modalContent">{this.props.children}</div>        
        <div>
          <button className="toggleButton" onClick={this.onClose}>
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
        firstName:'',
        lastName:'',
        key:''
      }
    }
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }


  state = {show:false};

  showModal = () => {
    this.setState({show:!this.state.show});
  }

  handleFirstName(e) {
    this.setState({
      currentUser: {
        firstName: e.target.value,
        key: Date.now()
      }
    })
  }

  handleLastName(e) {
    this.setState({
      currentUser: {
        lastName: e.target.value
      }
    })
  }

  addUser(e) {
    e.preventDefault();
    const newUser = this.state.currentUser;
    console.log(newUser);
    if (newUser.firstName!=="" && newUser.lastName!=="") {
      const newUsers = [...this.state.users, newUser];
      this.setState({
        users: newUsers,
        currentUser:{
          firstName:'',
          lastName:'',
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
        <button onClick={e => {this.showModal(e);}}>show Modal{""}</button>
        <Modal  onClose={this.showModal} show={this.state.show}>
          <form id="userForm" onSubmit={this.addUser}>
            <input type="text" placeholder="First Name"
            onChange={this.handleFirstName}
            value={this.state.currentUser.firstName}/>
            <input type="text" placeholder="Last Name"
            onChange={this.handleLastName}
            value={this.state.currentUser.lastName}/>
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

  