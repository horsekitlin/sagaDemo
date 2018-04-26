import React, { Component } from 'react';
import moment from 'moment';
import { Segment, Header, Input, List, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {addNewData} from './utils/firebaseManager';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      isFetching: false,
      task: ''
    }
  }

  async createTask(text){
    const task =  {
      text,
      status: 'queue',
      updated_at: moment().format('YYYY MM DD hh:mm:ss'),
      created_at: moment().format('YYYY MM DD hh:mm:ss')
    }
    await addNewData({route: '/tasks', query: task});
    return task;
  }

  addTask = async (text) => {
    this.setState({isFetching: true});
    const task = await this.createTask(text);
    const {todos} = this.state;
    todos.push(task);
    this.setState({todos, isFetching: false});
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
                    <List.Description as='a'>{todo.created_at}</List.Description>
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
