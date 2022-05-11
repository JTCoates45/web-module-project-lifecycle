import React from 'react'
import axios from 'axios'


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

state = {
  todos: [],
  error: "",
  todoNameInput: "",
}

postNewTodo = () => {
  axios.post(URL, {name: this.state.todoNameInput})
  .then(res => {
    this.fetchAllTodos()
    this.setState({...this.state, todoNameInput: ''})
  })
  .catch(err => {
    this.setState({...this.state, error: err.response.data.message})
  })
}

onTodoFormSubmit = evt => {
  evt.preventDefault()
  this.postNewTodo()
}

onInputChange = evt => {
  const { value} = evt.target
  this.setState({ ...this.state, todoNameInput: value})
}

fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
}



componentDidMount () {
  this.fetchAllTodos()
}


  render() {
    return  (
    <div> 
      <div id="error">Error: {this.state.error} </div>
      <div id="todos">
      <h1> Todo list:</h1>  
      {
        this.state.todos.map(td => {
          return <div key={td.id}> {td.name} </div>
        })
      }
    </div>
    <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
      <input value={this.state.todoNameInput} onChange= {this.onInputChange} type="text" placeholder='Type Todo'></input>
      <input type="submit"></input>
      <button> Clear Sucsess</button> 
    </form>
    </div>
    )
  }
}

