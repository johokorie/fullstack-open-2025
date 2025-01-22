const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content course={props.course} />
    </div>
  );
}

const Header =(props)=> {
  return (
    <h1>{props.name}</h1>
  )
}
const Content=(props)=>{
  return (
    <div>
      <Part parts={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
      <Part parts={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
      <Part parts={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </div>
  )
}

const Part=(props)=>{
  return (
    <div>
      <p>{props.parts} {props.exercises}</p>
    </div>
  )
}

const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

  return (
    <Course course={course} />
  )
};

export default App;
