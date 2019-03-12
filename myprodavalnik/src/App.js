import React, { Component, Fragment } from 'react';

import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'

import { Redirect } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AllPosts from './components/AllPosts';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import MyPosts from './components/MyPosts';





import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isAdmin: false,
      postCreated:false
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

        
          toast.info(body.message)
        if (body.name) {
        localStorage.setItem('name', body.name)
        localStorage.setItem('token',body.token)
        localStorage.setItem('userId',body.userId)
          
        }


        if (body.role === 'Admin') {
          this.setState({
            name: body.name,
            isAdmin: true
          })
        }
        else {
          this.setState({
            name: body.name
          })
        }


      })
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
        
          toast.info(body.message)
          if (body.name) {
              localStorage.setItem('name', body.name)
            
          }
        

        this.setState({
          name: body.name
        })
      })
  }
  logout=()=>{
    this.setState({
      name:'',
      isAdmin:false
    })
    localStorage.clear()
  }
  
  
  createPost(data){
    fetch('http://localhost:9999/feed/post/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${localStorage.token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(body => {
        
          toast.info(body.message)
          if(body.success){
        //todo redirect

          }
        

        
      })
  }
  
  render() {
    return (

      <Fragment>
  
        <Header logout={this.logout} name={this.state.name}/>
    <ToastContainer />

        <Switch>
        <Route path='/' render={() => <Home />} exact/>
          <Route path='/login' render={() => <Login logIn={this.logIn} name={this.state.name} />} />
          <Route path='/register' render={() => <Register register={this.register} name={this.state.name} />} />
          <Route path='/posts/all' render={() => <AllPosts  />} />
          <Route path='/posts/my/:id' render={(props) => <MyPosts  {...props}/>} />

          <Route path='/post/details/:id' render={(props) => <PostDetails {...props}/>} />

          <Route path='/posts/create' render={() => <CreatePost  createPost={this.createPost}/>} postCreated={this.state.postCreated}/>


        </Switch>
        <Footer />
      </Fragment>


    );
  }
}

export default App;
