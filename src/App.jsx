import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import { useState } from 'react'

function App({ onAdd }) {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([{
    id: 1,
    text: 'Doctors Appointment',
    day: 'today',
    reminder: true
  }, {
    id: 2,
    text: 'plumbers Appointment',
    day: 'tommorrow',
    reminder: false
  }])

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
    let newArr = [...tasks]
    newArr.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(newArr))
  }


  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    console.log(id)
    let newArr = JSON.parse(localStorage.getItem('tasks'))

    newArr = newArr.filter((task) => task.id !== id)
    console.log(newArr)
    localStorage.setItem('tasks', JSON.stringify(newArr))
    console.log(newArr)
  }


  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task
    ))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : ('    No Tasks To Show')
      }
    </div>
  )
}

export default App
