import React, { Component } from 'react';
import moment from 'moment';
import { Segment, Header, Input, List, Button, Dropdown, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { addOrUpdateNewData, getValue, getUnquieKey } from './utils/firebaseManager';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      isFetching: false,
      task: ''
    }
  }

  async componentDidMount(){
    this.setState({isFetching: true});
    const tasks = await getValue('/tasks');
    this.setState({todos: tasks, isFetching: false});
  }

  async createTask(text){
    const task =  {
      StoreKey: getUnquieKey('/tasks'),
      text,
      status: 'queue',
      updated_at: moment().format('YYYY MM DD hh:mm:ss'),
      created_at: moment().format('YYYY MM DD hh:mm:ss')
    }
    await addOrUpdateNewData({route: '/tasks', query: task});
    return task;
  }

  updateTaskStatus = async (task, index, status) => {
    this.setState({isFetching: true});
    task.status = status;
    const {todos} = this.state;
    todos.splice(index, 1);
    todos.splice(index, 0, task);
    await addOrUpdateNewData({route: '/tasks', query: task});
    this.setState({todos, isFetching: false});
  }

  addTask = async (text) => {
    this.setState({isFetching: true});
    const task = await this.createTask(text);
    const {todos} = this.state;
    todos.push(task);
    this.setState({task: '', todos, isFetching: false});
  }

  deleteTask = (index) => {
    const {todos} = this.state;
    todos.splice(index, 1);
    this.setState({todos});
  }
  render() {
    return (
        <Segment basic loading={this.state.isFetching}>
          <Header>Todo Demo</Header>
          <Input onChange={(e, {value}) => this.setState({task: value})} value={this.state.task}/> <Button icon='plus'  onClick={(e, {value}) => this.addTask(value)} value={this.state.task}></Button>
          <Segment basic>
          <List divided relaxed>
            {this.state.todos.map((todo, index) => {
              return (
                <List.Item key={`todo-${index}`}>
                  <List.Icon name='trash' color='red' size='large' verticalAlign='middle' onClick={() => this.deleteTask(index)}/>
                  <List.Content>
                    <List.Header as='a'>{todo.text}</List.Header>
                    <List.Description as='a'>
                      {todo.created_at}
                    </List.Description>
                  </List.Content>
                  
                  <List.Content floated='right'>
                  <Dropdown item text='修改狀態'>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.updateTaskStatus(todo, index, 'queue')}>To Do</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.updateTaskStatus(todo, index, 'processing')}>Processing</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.updateTaskStatus(todo, index, 'done')}>done</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <List.Description>
                    <Label>{todo.status}</Label>
                  </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
          </Segment>
        </Segment>
    );
  }
}

export default App;
