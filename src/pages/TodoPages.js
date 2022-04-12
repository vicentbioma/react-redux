import Axios from 'axios'
import React from 'react'
import {
    FormControl,
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux'


// import component
import ToDoItem from '../component/ToDoItem'

// import action
import { getData } from '../redux/actions'

class TodoPages extends React.Component {
    fetcData = () => {
        Axios.get('http://localhost:2000/activities')
            .then(res => {
                // kirim res.data ke todoReducer dengan action detData
                this.props.getData(res.data)
            })
    }

    // {
    //     constructor(props) {
    //         super(props)
    //         this.state = {
    //             activities: []
    //                 { id: 1, name: 'Makan' },
    //                 { id: 2, name: 'Tidur' },
    //                 { id: 3, name: 'Coding' },
    //         }
    //     }

    // fetcData = () => {
    //     Axios.get('http://localhost:2000/activities')
    //         .then(res => {
    //             // kirim res.data ke TodoReducer dg action getData
    //             this.props.getData(res.data)
    //             // console.log(this.state.activities)
    //             // console.log(res.data)
    //             // this.fetcData()
    //         })
    // }

    componentDidMount() {
        this.fetcData()
    }

    // componentDidUpdate() {
    //     alert('component did update')  
    // }

    onAdd = () => {
        let newTodo = this.refs.todo.value
        // let id = this.state.activities.length + 1
        // let tempArr = [...this.state.activities]
        // tempArr.push({ id, name: newTodo })
        // console.log(tempArr)
        // this.setState({ activities: tempArr })
        // this.refs.todo.value = ''
        let db = { name: newTodo, isCompleted: false }
        Axios.post('http://localhost:2000/activities', db)
            .then(res => {
                // this.setState({activities: res.data})
                console.log(res.data)
            })
        // .catch(err => console.log(err))
        this.fetcData()

    }

    onDelete = (id) => {
        Axios.delete(`http://localhost:2000/activities/${id}`)
            .then(res => {
                // this.setState({activities : res.data})
                // console.log(this.state.activities)
                // console.log(res.data)
                this.fetcData()
            })
        let tempArr = this.state.activities.filter(item => {
            return item.id !== id
        })
        this.setState({ activities: tempArr })
    }

    onComplete = (id) => {
        Axios.patch(`http://localhost:2000/activities/${id}`, { isCompleted: true })
            .then(res => {
                // console.log(res.data)
                this.fetcData()
            })
    }

    showData = () => {
        return (
            this.props.listActivity.map(item => {
                return (
                    <ToDoItem
                        data={item}
                        key={item.id}
                        delete={() => this.onDelete(item.id)}
                        complete={() => this.onComplete(item.id)}
                    />
                )
            })
        )
    }

    onMultiDim = () => {
        Axios.get('http://localhost:2000/multi')
    }
    render() {
        // alert('Component Render')
        console.log(this.props.listActivity)
        return (
            <div style={styles.container}>
                <h1>TO DO LIST</h1>
                {this.showData()}
                <div style={styles.input}>
                    <FormControl
                        placeholder="Input New Todo"
                        ref="todo"
                    />
                    <Button variant="primary" onClick={this.onAdd} className="ml-2">Add</Button>
                </div>
                <button oncClick={this.onMultiDim} variant="info">Get String Data</button>
            </div>
        )
    }
}

const styles = {
    container: {
        padding: '15px'
    },
    input: {
        width: '25vw',
        display: 'flex',

    }
}

const mapStateToProps = (state) => {
    return {
        listActivity: state.todo.activities
    }
}

export default connect(mapStateToProps, { getData })(TodoPages)



