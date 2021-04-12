import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

// MUI Stuff
import Container from '@material-ui/core/Container';

// Components
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ButterToast, { POS_RIGHT, POS_TOP } from 'butter-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';

const App = () => {
  return(
    <>
      <Router>
        <Header />
        <Container>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/admin/userlist' component={UserListPage} />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route path='/' component={HomePage} exact />
          <Route
            path='/admin/productlist'
            component={ProductListPage}
            exact
          />
          <ButterToast position={{vertical: POS_TOP, horizontal: POS_RIGHT}} />
        </Container>
      </Router>
    <Footer />
    </>
  )
}

export default App;