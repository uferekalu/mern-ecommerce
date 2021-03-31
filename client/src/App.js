import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

// MUI Stuff
import Container from '@material-ui/core/Container';

// Components
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
  return(
    <Router>
      <Container>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
      </Container>
    </Router>
  )
}

export default App;