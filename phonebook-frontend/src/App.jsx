import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'
// npx json-server --port 3001 --watch db.json
// npm install axios
// npm install json-server --save-dev

const Filter = ({text,value,change}) => <div>{text} <input value={value} onChange={change}/></div>

const PersonForm  = ({addName,valueName,handleNewName,valueNumber,handleNewNumber}) => {
  return(
  <form onSubmit={addName}>
    <div>name: <input value={valueName} onChange={handleNewName} /></div>
    <div>number: <input value={valueNumber} onChange={handleNewNumber} /></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}
const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person.id,person.name)}>delete</button>
        </div>
      ))}
    </>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const NotificationRed = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="errorred">
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageRed, setErrorMessageRed] = useState(null);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {  name: newName, number: newNumber, id: (persons.length + 1).toString() };

    if (!newName || !newNumber) {
      setErrorMessageRed("Name or number is missing");
      setTimeout(() => {
        setErrorMessageRed(null);
      }, 5000);
      return;
    }
    
    if (persons.some((person) => person.name === newName)) {
      
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const existingPerson = persons.find(person => person.name === newName);
        const updatedPerson = { ...existingPerson, number: newNumber };

        personsService
          .update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setErrorMessage(
              `Phone changed. name:'${nameObject.name}' number:  '${nameObject.number}'`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setErrorMessageRed(
              `information of '${nameObject.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessageRed(null)
            }, 5000)

          });
      }
    } else {
      personsService
      .create(nameObject)
      .then(initialPersones  => {
        setErrorMessage(
          `Added '${nameObject.name}' `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setPersons(persons.concat(initialPersones));
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessageRed(error.response.data.error);
        } else {
          setErrorMessageRed("Error adding person");
        }
        setTimeout(() => {
          setErrorMessageRed(null);
        }, 5000);
      });
      // setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = (id,name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
      .eliminar(id)
      .then(()  => {
      setPersons(persons.filter(person => person.id !== id));
      })
  }
}

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleSearchTerm = (event) => setSearchTerm(event.target.value);

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersones => {
        setPersons(initialPersones)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationRed message={errorMessageRed}/>
      <Notification message={errorMessage} />
      <Filter text={"filter shown with:"} value={searchTerm} change={handleSearchTerm}/>
      
      <h2>add a new</h2>
      <PersonForm addName={addName} valueName={newName} handleNewName={handleNewName} valueNumber={newNumber} handleNewNumber={handleNewNumber}/>


      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>

    </div>
  );
};

export default App;
