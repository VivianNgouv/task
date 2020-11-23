import React  from 'react';
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
  