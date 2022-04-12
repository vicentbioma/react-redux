import React from 'react'
import NavigationBar from './src/component/Navbar.jsx'
import TodoPages from './src/pages/TodoPages'


class App extends React.Component {
    render() {
        return(
            <div>
                <NavigationBar/>
                <TodoPages/>
            </div>
        )
    }
}

export default App