import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CategoryPosts from './Components/CategoryPosts';
import PostDetails from './Components/PostDetails';
import PostForm from './Components/PostForm';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <div className="container">
          <Route path="/" exact component={CategoryPosts}/>
          <Route path="/:category" exact component={CategoryPosts}/>
          <Route path="/posts/add/newPost" exact component={PostForm}/>
          <Route path="/:category/:id" exact component={PostDetails}/>
          <Route path="/posts/edit/:id" component={PostForm}/>
        </div>
      </div>
    );
  }
}

export default App;

