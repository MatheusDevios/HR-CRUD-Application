import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  //creating states to get the input value typed
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);



  //passing the input value to the backend
  const addEmployee = () => {
    // console.log(name);
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then((response) => {
      console.log(response.body);
      //show employees when click add Employee
      // setEmployeeList([...employeeList, {
      //   name: name,
      //   age: age,
      //   country: country,
      //   position: position,
      //   wage: wage
      // }])
    })
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    })
  }

  const updateEmployeeWage = (_id) => {
    Axios.patch('http://localhost:3001/update', {
      wage: newWage,
      _id: _id
    }).then((response) => {
      // alert('Updated, please refresh the page.')
      setEmployeeList(employeeList.map((value) => {
        return value._id == _id ? {
          name: value.name,
          age: value.age,
          country: value.country,
          position: value.position,
          wage: newWage
        } : value;
      }))
    })
  }

  const deleteEmployee = (_id) => {
    Axios.delete(`http://localhost:3001/delete/${_id}`).then(() => {
      setEmployeeList(employeeList.filter((value) => {
        return value._id != _id;
      }))
    });
  }

  return (
    <div className="App">
        <form className="information">
          <label >Name:</label>
          <input type="text" onChange={(event) => { setName(event.target.value); }} name="" id="" />
          <label >Age:</label>
          <input type="number" onChange={(event) => { setAge(event.target.value); }} name="" id="" />
          <label >Country:</label>
          <input type="text" onChange={(event) => { setCountry(event.target.value); }} name="" id="" />
          <label >Position:</label>
          <input type="text" onChange={(event) => { setPosition(event.target.value); }} name="" id="" />
          <label >Wage/year:</label>
          <input type="number" onChange={(event) => { setWage(event.target.value); }} name="" id="" />
          <button onClick={addEmployee}>Add Employee</button>
        </form>
      <hr />
      <div className='employees'>
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((value, key) => {
          return (
            <div className='employee'>
              <div>
                <h3>Name: {value.name}</h3>
                <h3>Age: {value.age}</h3>
                <h3>Country: {value.country}</h3>
                <h3>Position: {value.position}</h3>
                <h3>Wage/Year: {value.wage}</h3>
                <button onClick={() => { deleteEmployee(value._id) }}>Delete</button>
              </div>
              <div>
                {""}
                <input onChange={(event) => { setNewWage(event.target.value); }} type="number" placeholder='New wage' />
                <button onClick={() => { updateEmployeeWage(value._id) }}>Update</button>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
