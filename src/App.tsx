import React, { useEffect, useMemo } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = React.useState<any>([]);
  const  [forceRemove, setForceRemove] = React.useState(false)
  
  useEffect(() => {
    const taskLocal:any = localStorage.getItem("task")
    const taskJson= JSON.parse(taskLocal)
    setTask(taskJson)
  }, []);


  function createNewTask(e:any) {
    e.preventDefault()
    const data = {
      id: Math.floor(Date.now() * Math.random()).toString(36),
      name: e.target.taskName.value,
      complete: false
    };
    setTask([data, ...task]);
    e.target.taskName.value = "";
  }

  function deleteTask(id:any) {
    const index = task.findIndex((e:any) => e.id === id);
    console.log(index)
    setTask(task.filter((x:any, i:any) => i !== index));
    if(index === 0){
      setForceRemove(true)
    }
    else{
      setForceRemove(false)
    }
  }
  function complete(id:any, value:any) {
    setTask(task.map((task:any) =>{
      if(task.id === id){
        return {...task, complete: value}
      }
      else{
        return task
      }
    }))
  }

  useMemo(() => { task.length || forceRemove ? setLocalStorage(): null }, [task])
  
  function setLocalStorage(){
    localStorage.setItem("task", JSON.stringify(task));
  }
  
  return (
    <div className="App">
      <h1>Hello </h1>
      <form onSubmit={(e) => createNewTask(e)}>
        <input type="text" required placeholder="Create new task" name="taskName" />
        <button type="submit">Add Task</button>
      </form>
      <div className="taskContainer">
        {task.filter((x:any, i:any) => x.id !== 0).map((element:any) => (
          <div
            className="tasks"
            key={element.key}
            style={
              element.complete
                ? { background: "green" }
                : { background: "gray" }
            }
          >
             <div className="name">
              <input
                type="checkbox"
                onChange={(e) => complete(element.id, e.target.checked)}
                checked={element.complete}
              />
              {element.name}
            </div>
            <button onClick={() => deleteTask(element.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
