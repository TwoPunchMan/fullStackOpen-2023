const Header = ({ name }) => <h1>{name}</h1>

const Course = ({ course }) => {
  const sum = course.parts
    .map(part => part.exercises)
    .reduce((sum, exercises) => sum + exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ sum }) => {
  return (
    <strong>
      total of {sum} exercises
    </strong>
  )
}

export default Course;
