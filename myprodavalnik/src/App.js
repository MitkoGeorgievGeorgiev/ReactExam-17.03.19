import React, { Component, Fragment } from 'react';
import { BrowserRouter,Router, Switch,Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class App extends Component {
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
          localStorage.setItem('username', body.username)
          localStorage.setItem('userId', body.userId)
          localStorage.setItem('token', body.token)
          toast.success(body.message);
          this.setState({
            username: body.username,
            isAdmin: body.isAdmin
          })
        }
  
  
      }
      )
  
  }
  render() {
    return (
      
        <Fragment>
          <Header />
          <Switch>
            <Route path='/login' render={() => <Login logIn={this.logIn} />} />
          </Switch>
          <Footer />
        </Fragment>


    );
  }
}

export default App;
