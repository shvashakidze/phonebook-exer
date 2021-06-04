import React, { useState,  useEffect } from 'react'
import axios from 'axios'
import css from './index.css'

const RenderPersons =({persons, searchName})=>{
     return(
       persons.length ?
       <ul style={{liststyle: 'none', padding: 0}}>
        { persons.filter(person=>person.name.toLowerCase().includes(searchName.toLowerCase())).map(person=>(
        <li key={person.name}>{person.name} {person.number}
        </li>
        )) }
        </ul>
        :
        <p></p>
        );
};

const Filter =({searchName, setSearchName})=>{
  return(
    <div>
    Filter shown with: <input value={searchName}
    onChange={(event)=>setSearchName(event.target.value)}
    />
    </div>
    );
};

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ notes, setNotes ] = useState([]);
  const [ newNotes, setNewNote ] = useState('');
  const [ newName, setNewName ] = useState('');
  const[newNumber, setNewNumber]= useState('');
  const[searchName, setSearchName]= useState('');
  
//const focusName = useRef();

useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [])
console.log('render', persons.length, 'notes')

const clearInput = ()=>{
  setNewName('');
  setNewNumber('');
  //focusName.current.focus();
};


const handleNameChange =(event) =>{
  setNewName(event.target.value);
}
const handleNumberChange=(event)=>{
  setNewNumber(event.target.value);   
 
}

const handleSubmit = event => {
  event.preventDefault()
  const noteObject = {
    content: newName,
    date: new Date(),
    important: Math.random() < 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')

      console.log(response)
    })

    const alert = persons.find(person => person.name  ===newName || person.number === newNumber)
     
     if(alert){
     window.confirm(`${newName} is already added to phonebook`)
     }else{
   
   
   setPersons([
     ...persons,
     {name: newName, number: newNumber}
     ]);

     }
}

 /*const handleSubmit = (event) => {
   event.preventDefault();
   axios.post('http://localhost:3001/persons', )
   
const alert = persons.find(person => person.name  ===newName || person.number === newNumber)
     
     if(alert){
     window.confirm(`${newName} is already added to phonebook`)
     }else{
   
   
   setPersons([
     ...persons,
     {name: newName, number: newNumber}
     ]);

     }
     
  }*/
   

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName}
    
      />
      <form onSubmit={handleSubmit}>
      <h2>Add a new</h2>
        <div>
          name: <input
            id="nameinput"
            value={newName}
            onChange={handleNameChange}
            autoComplete='on'
            //focusName={focusName}
          />
          </div>
          <div>
          numb: <input 
           id="nameinput"
           value={newNumber}
           onChange={handleNumberChange}
           autoComplete='off'
           //focusName={focusName}
           />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <RenderPersons persons={persons} searchName={searchName}/>
    </div>
  )
}



export default App