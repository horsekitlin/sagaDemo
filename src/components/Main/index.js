import React, { Component } from 'react';
import moment from 'moment';
import { Segment, Header, Input, List, Button, Dropdown, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { addOrUpdateNewData, getValue, getUnquieKey,removeData } from '../../utils/firebaseManager';

const TaskStatus = ({task}) =>{
  switch(task.status){
    case 'done':
      return <Label color='green'>完成</Label>
    case 'processing':
      return <Label color='orange'>進行中</Label>
    default:
      return <Label color='blue'>想要做</Label>
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isFetching: false,
      task: ''
    }
  }

  async componentDidMount(){
    this.props.getTasks();
    this.setState({isFetching: true});
    const tasks = await getValue('/tasks');
    this.setState({tasks: tasks, isFetching: false});
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
    const {tasks} = this.state;
    tasks.splice(index, 1);
    tasks.splice(index, 0, task);
    await addOrUpdateNewData({route: '/tasks', query: task});
    this.setState({tasks, isFetching: false});
  }

  addTask = async (text) => {
    this.setState({isFetching: true});
    const task = await this.createTask(text);
    const {tasks} = this.state;
    tasks.push(task);
    this.setState({task: '', tasks, isFetching: false});
  }

  deleteTask = async (task, index) => {
    const {tasks} = this.state;
    await removeData(`/tasks/${task.StoreKey}`);
    tasks.splice(index, 1);
    this.setState({tasks});
  }

  render() {
    return (
        <Segment basic loading={this.props.status.isFetching}>
          <Header>Todo Demo</Header>
          <Input onChange={(e, {value}) => this.setState({task: value})} value={this.state.task}/> <Button icon='plus'  onClick={(e, {value}) => this.addTask(value)} value={this.state.task}></Button>
          <Segment basic>
          {this.props.tasks.error && <Label color='red'>  哎呀!出錯了! </Label>}
          <List divided relaxed>
            {this.props.tasks.list.map((task, index) => {
              return (
                <List.Item key={`todo-${index}`}>
                  <List.Icon name='trash' color='red' size='large' verticalAlign='middle' onClick={() => this.deleteTask(task, index)}/>
                  <List.Content>
                    <List.Header as='a'>{task.text}</List.Header>
                    <List.Description as='a'>
                      {task.created_at}
                    </List.Description>
                  </List.Content>
                  
                  <List.Content floated='right'>
                  <Dropdown item text='修改狀態'>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => this.updateTaskStatus(task, index, 'queue')}>To Do</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.updateTaskStatus(task, index, 'processing')}>Processing</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.updateTaskStatus(task, index, 'done')}>done</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <List.Description>
                    <TaskStatus task={task} />
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
