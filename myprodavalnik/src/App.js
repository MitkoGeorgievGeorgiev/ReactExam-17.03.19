import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from 'react-private-route'

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
import EditPost from './components/EditPost';
import DeletePost from './components/DeletePost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isAdmin: false,
      postCreated: false,
      postForEditting: {}
    }
    this.createPost = this.createPost.bind(this)
    this.resetState = this.resetState.bind(this)

  }
  resetState() {
    this.setState({
      postCreated: false
    })
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
          localStorage.setItem('token', body.token)
          localStorage.setItem('userId', body.userId)
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
  logout = () => {
    this.setState({
      name: '',
      isAdmin: false
    })
    localStorage.clear()
  }

  createPost(data) {
    fetch('http://localhost:9999/feed/post/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.token}`
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(body => {
        toast.info(body.message)
        if (body.success) {
          this.setState({
            postCreated: true
          })
        }
      })
  }
  render() {
    return (
      <Fragment>
        <Header logout={this.logout} name={this.state.name} />
        <ToastContainer />
        <Switch>
          <Route path='/' render={() => <Home resetState={this.resetState} />} exact />
          <Route path='/logout' render={() => <Home resetState={this.resetState} />} exact />

          <Route path='/login' render={() => <Login logIn={this.logIn} name={this.state.name} />} />
          <Route path='/register' render={() => <Register register={this.register} name={this.state.name} />} />
          <Route path='/posts/all' render={() => <AllPosts />} />
          <Route path='/posts/my/:id' render={(props) => <MyPosts  {...props} />} />
          <Route path='/post/details/:id' render={(props) => <PostDetails {...props} postToEdit={this.postToEdit} isAdmin={this.state.isAdmin} />} />
          <Route path='/post/update/:postId' render={(props) => <EditPost {...props} postCreated={this.state.postCreated} />} />
          <Route path='/posts/create' render={(props) => <CreatePost postCreated={this.state.postCreated} createPost={this.createPost} />} />
          <Route path='/post/delete/:postId' render={(props) => <DeletePost {...props} />} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
