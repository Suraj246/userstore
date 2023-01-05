import './App.css';
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState({
    name: '', address: ''
  })
  const Form = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const sendUserData = (e) => {
    e.preventDefault();
    if (!user.name || !user.address) {
      alert("box is empty")
      console.error("Fill Every Field");
      return false;
    }
    axios.post('http://localhost:5000/users', user)
      .then((res) => {
        console.log(res);
        alert("information is sent");
      })
      .catch((err) => console.error("Login Failed", err)
      )
    setUser({ name: '', address: '' })
  }

  return (
    <div className="App">
      <form onSubmit={sendUserData}>
        <input type="text" name="name" id="name" value={user.name} onChange={Form}
          placeholder="Name"
        />
        <input type="text" name="address" id="address" value={user.address} onChange={Form}
          placeholder="Address"
        />
        <input type="submit" id='submit' />
      </form>
    </div>
  );
}

export default App;
