import React from 'react'
import {
    Navbar
} from 'react-bootstrap'
import {connect} from 'react-redux'

// import { connect } from 'react-redux'

class NavigationBar extends React.Component {
    render() {
        console.log(this.props.listActivity)
        return (
            <Navbar style={styles.container} bg="dark">
                <h3>{this.props.namaUser}</h3>
                <h3>You Have {this.props.listActivity.length}  To Do Item</h3>
            </Navbar>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between', 
        color: 'white'
    }
}

const mapStateToProps = (state) => {
    return {
        listActivity: state.todo.activities,
        namaUser: state.todo.namaUser
    }
}

export default connect(mapStateToProps)(NavigationBar) 