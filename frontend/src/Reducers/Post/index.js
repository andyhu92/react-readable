import {
    FETCH_POSTS,
    EDIT_POST,
    ADD_POST,
    DELETE_POST,
    UPVOTE_POST,
    DOWNVOTE_POST
  } from '../../Actions/types'

  export default function posts (state = [], action) {
    let post, i;
    switch (action.type) {
      case FETCH_POSTS:
          return action.posts;
      case ADD_POST:
          return [...state, action.post];
      case EDIT_POST:
          post = state.find(p => p.id === action.post.id);
          i = state.indexOf(post);
          return [...state.slice(0,i), action.post, ...state.slice(i+1)];
      case DELETE_POST:
          post = state.find(p => p.id === action.id);
          i = state.indexOf(post);
          return [...state.slice(0,i), ...state.slice(i+1)];
      case UPVOTE_POST:
          post = state.find(p => p.id === action.id);
          i = state.indexOf(post);
          return [...state.slice(0,i), {...post, voteScore: post.voteScore + 1}, ...state.slice(i+1)];
      case DOWNVOTE_POST:
          post = state.find(p => p.id === action.id);
          i = state.indexOf(post);
          return [...state.slice(0,i), {...post,voteScore: post.voteScore - 1}, ...state.slice(i+1)];
      default:
        return state
    }
  }