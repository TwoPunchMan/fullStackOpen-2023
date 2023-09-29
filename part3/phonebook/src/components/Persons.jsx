const Persons = ({ people, deleteFunction }) => {
  return (
    <div>
      {people.map(person =>
        <div key={person.id}>{person.name} {person.number} <button onClick={() => deleteFunction(person)}>
            delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Persons;
