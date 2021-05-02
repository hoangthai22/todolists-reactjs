    import React, { Component } from 'react';
import './main.css'
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:'',
            name: '',
            status: false
        }
    }

    componentDidMount() {
        if(this.props.taskEditing) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        } else {

        }
    }
    // component này khi form mở lên rồi những vẫn nhận props tiếp theo
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            });
        }else if(!nextProps.taskEditing) {
            this.onClear();
        }

    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
        
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name:'',
            status: false
        });
    }

    render(){

        var { id } = this.state;
        if(!this.props.isDisplayForm) return '';
        return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            { id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span 
                            className="fa fa-times-circle"
                            onClick={ this.onCloseForm }
                            ></span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={ this.state.name }
                                    onChange={ this.onChange}
                                />
                            </div>
                            <label>Trạng Thái :</label>
                            <select 
                                className="form-control" 
                                required="required"
                                name="status"
                                value={this.state.status}
                                onChange={ this.onChange}
                            >
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={this.onClear}
                                >Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}
//chuyển state trên store thành props
const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskEditing: state.taskEditing
    }
}
//chuyển 1 dispath thành props để thực thi action
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);//tham số thứ 2 sẽ là acion mà
                                                        // mình dispath để thực thi gọi lên store
