import { connect } from 'react-redux';
import Main from '../components/Main';
import { getTasksAction} from '../actions/taskActions';
const mapStateToProps = ({status}) => ({
  status,
})

const mapDispatchToProps = dispatch => ({
  getTasks: payload => dispatch(getTasksAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
