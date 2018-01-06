import { fetchPosts, upvotePost, downvotePost, addNewPost, updatePost, deletePost } from '../../Util/api'
import {
    FETCH_POSTS,
    UPVOTE_POST,
    EDIT_POST,
    ADD_POST,
    DOWNVOTE_POST,
    DELETE_POST
} from '../types'

export function getPosts () {
    return function(dispatch){
      return fetchPosts()
                  .then(posts => {
                              dispatch({
                                  type: FETCH_POSTS,
                                  posts
                              });
                              return posts;
                  });
    }
  }

  export function upvotePostAction(id) {
      return function(dispatch){
          return upvotePost(id)
                      .then(res => dispatch({
                          type: UPVOTE_POST,
                          id
                      }));
      }
  }

  export function downvotePostAction(id) {
      return function(dispatch){
          return downvotePost (id)
                      .then(res => dispatch({
                          type: DOWNVOTE_POST,
                          id
                      }));
      }
  }

  export function addPost(post) {
      return function(dispatch){
          return addNewPost(post)
                  .then(res => {
                      dispatch({
                          type: ADD_POST,
                          post: res
                      })
                      return res;
                  });
      }
  }

  export function editPost(post) {
      return function(dispatch){
          return updatePost(post)
                  .then(res => {
                      dispatch({
                          type: EDIT_POST,
                          post
                      })
                      return post;
                  });
      }
  }

  export function deletePostAction(id) {
      return function(dispatch){
          return deletePost(id)
                  .then(res => {
                      dispatch({
                          type: DELETE_POST,
                          id
                      })
                      return res;
                  });
      }
  }