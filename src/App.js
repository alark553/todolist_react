import React, { Component } from 'react';
import styled from 'styled-components';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import ContentEditable from 'react-contenteditable'

const Wrapper = styled.section`
  padding:20px;
  margin:0 auto;
  width:80%;
`
const Title = styled.h2`
  padding:10px;
  color:palevioletred;
`

const Input = styled.input.attrs({
  type: 'text',
}) `
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width:100%;
  padding:20px;
`;

const ToDoItems = styled.ul`
  border: 1px solid #ededed; 
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2);
  margin:20px;
  width:100%;
  list-style-position: inside;
  padding-left: 0;
`

const ToDoItem = styled.li`
  padding:20px;
  color:palevioletred;
  font-size:16px;
  list-style:none;
  display:block;
  transition: color 0.4s;
  border-bottom: 1px solid #ededed;
  text-decoration: ${(props) => props.completed ? 'line-through' : 'none'};
`;

const IconWrapper = styled.span`
  cursor:pointer;
  float:right;
  font-size:inherit;
  display:block;
  margin:0 5px;
`

const Checkbox = styled.input.attrs({
  type: 'checkbox',
}) `
position: absolute;
opacity: 0;

& + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}

& + label:before {
  content: '';
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  width: 15px;
  height: 15px;
  background: white;
  border:2px solid palevioletred;
  
}

&:hover + label:before {
  background: palevioletred;
}

&:checked + label:before {
  background: palevioletred;
}

&:disabled + label {
  color: #b8b8b8;
  cursor: auto;
}

&:disabled + label:before {
  box-shadow: none;
  background: #ddd;
}

&:checked + label:after {
  content: '';
  position: absolute;
  left: 5px;
  top: 9px;
  background: white;
  width: 2px;
  height: 2px;
  box-shadow: 
    2px 0 0 white,
    4px 0 0 white,
    4px -2px 0 white,
    4px -4px 0 white,
    4px -6px 0 white,
    4px -8px 0 white;
  transform: rotate(45deg);
  transition:box-shadow 1s;
}
`;

const Editable = styled(ContentEditable)`
  padding:5px;
`





class App extends Component {
  state = {
    tasks: [
      {
        'title': 'React',
        'completed': false,
        'editable':false
      },
      {
        'title': 'Vue',
        'completed': false,
        'editable':false
      },
      {
        'title': 'Angular',
        'completed': false,
        'editable':false
      }
    ]
  }

  addTask = (event) => {
    if (event.which === 13) {
      const tasks = [...this.state.tasks];
      tasks.push({
        title: event.target.value,
        completed:false
      });
      this.setState({
        tasks: tasks
      })
      event.target.value = '';
    }
  }

  deleteTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    })
  }

  changeTaskState = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].completed = !tasks[index].completed;
    this.setState({
      tasks: tasks
    })
  }

  editTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].editable = !tasks[index].completed;
    console.log('tasks', tasks);
    this.setState({
      tasks: tasks
    })
  }

  
  handleChange = (index, event) => {
    const tasks = [...this.state.tasks];
    tasks[index].title = event.target.value;
    this.setState({
      tasks: tasks
    })
    this.setState({});
  };

  render() {
    const tasks = this.state.tasks.map((task, index) => {
      return (
        <ToDoItem completed ={task.completed} key={index}>
          <Checkbox id={index} onClick={() => this.changeTaskState(index)} />
            <label htmlFor={index}>
            </label>
            <Editable
              html={task.title}
              onChange={(event) => this.handleChange(index, event)}
              tagName='span'
            />
          <Checkbox />
          <IconWrapper onClick={() => this.deleteTask(index)}>
            <MdDeleteForever />
          </IconWrapper>
        </ToDoItem>
      )
    })
    return (
      <Wrapper>
        <Title>My To Do list</Title>
        <Input placeholder="Type some task and press enter to add your list" onKeyPress={this.addTask} />
        <ToDoItems>
          {tasks}
        </ToDoItems>
      </Wrapper>
    );
  }
}

export default App;
