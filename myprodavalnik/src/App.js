import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from './services/fetchData/fetchData'

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
import Error from './components/Error';


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

  logIn = (method, data) => {
    fetchData(method, data)
      .then(body => {
        toast.info(body.message)
        if (body.name) {
          localStorage.setItem('name', body.name)
          localStorage.setItem('token', body.token)
          localStorage.setItem('userId', body.userId)
          this.setState({
            name: body.name
          })
        }
      })

  }
  register = (method, data) => {
    fetchData(method, data)
      .then(body => {
        toast.info(body.message)
        if (body.name) {
          localStorage.setItem('name', body.name)
          localStorage.setItem('token', body.token)
          localStorage.setItem('userId', body.userId)
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

  createPost(method,data) {
    fetchData(method,data)
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
          <Route path='/posts/my/:id' render={(props) => localStorage.name ? <MyPosts  {...props} /> : <Redirect to='/login' />} />
          <Route path='/post/details/:id' render={(props) => localStorage.name ? <PostDetails {...props} postToEdit={this.postToEdit} isAdmin={this.state.isAdmin} name={this.state.name} /> : <Redirect to='/login' />} />
          <Route path='/posts/create' render={() => localStorage.name ? <CreatePost postCreated={this.state.postCreated} createPost={this.createPost} /> : <Redirect to='/login' />} />
          <Route path='/post/update/:postId' render={(props) => localStorage.isAdmin ? <EditPost {...props} postCreated={this.state.postCreated} /> : <Redirect to='/login' />} />
          <Route path='/post/delete/:postId' render={(props) => localStorage.isAdmin ? <DeletePost {...props} /> : <Redirect to='/login' />} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
