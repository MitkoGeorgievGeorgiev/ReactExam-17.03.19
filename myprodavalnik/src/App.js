import React, { Component, Fragment } from 'react';

import { BrowserRouter,Router, Switch,Route } from 'react-router-dom'

import { Redirect} from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class App extends Component {
  constructor(props){
    super(props)
    this.state={
      name:'',
      isAdmin:false
    }
  }
  logIn = (data) => {
    fetch('http://localhost:9999/auth/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(body => {
        if (!body.username) {
          toast.error('No such username or pass')
        }
        else {
          localStorage.setItem('name', body.name)
          localStorage.setItem('userId', body.userId)
          localStorage.setItem('token', body.token)
          toast.success(body.message);
          this.setState({
            username: body.username,
            isAdmin: body.isAdmin
          })
          }
      } )
  }
  register = (data) => {
    fetch('http://localhost:9999/auth/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(body => {
        if (!body.username) {
          toast.error('No such username or pass')
        }
        else {
          localStorage.setItem('name', body.name)
          localStorage.setItem('userId', body.userId)
          localStorage.setItem('token', body.token)
          toast.success(body.message);
          this.setState({
            name: body.name,
            isAdmin: body.isAdmin
          })
          }
      } )
  }
  render() {
    return (
      
        <Fragment>
          <Header />
          <Switch>
            <Route path='/login' render={() => <Login logIn={this.logIn} name={this.state.name}/>} />
            <Route path='/register' render={() => <Register register={this.register} name={this.state.name}/>} />
          </Switch>
          <Footer />
        </Fragment>


    );
  }
}

export default App;
