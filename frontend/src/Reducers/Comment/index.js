import {
    FETCH_COMMENTS,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT
  } from '../../Actions/types'


  export default function comments(state={}, action){
      let comment,comments,i;
      switch(action.type){
          case FETCH_COMMENTS:
              return {
                  ...state,
                 [action.postid]:action.comments
              };
           case ADD_COMMENT:
              comments = state[action.postid];
              comment = action.comment;
              return {
                  ...state,
                  [action.postid]:[...comments, comment]
              }
          case EDIT_COMMENT:
              comments = state[action.postid];
              comment = comments.find(c => c.id === action.comment.id);
              i = comments.indexOf(comment);
              return {
                  ...state,
                  [action.postid]:[...comments.slice(0,i), comment, ...comments.slice(i+1)]
              }
           case UPVOTE_COMMENT:
              comments = state[action.postid];
              comment = comments.find(c => c.id === action.id);
              i = comments.indexOf(comment);
              return {
                  ...state,
                 [action.postid]:[...comments.slice(0,i), {...comment, voteScore: comment.voteScore + 1 }, ...comments.slice(i+1)]
              };
           case DOWNVOTE_COMMENT:
              comments = state[action.postid];
              comment = comments.find(c => c.id === action.id);
              i = comments.indexOf(comment);
              return {
                  ...state,
                 [action.postid]:[...comments.slice(0,i), {...comment, voteScore: comment.voteScore - 1 }, ...comments.slice(i+1)]
              };
            case DELETE_COMMENT:
              comments = state[action.postid];
              comment = comments.find(c => c.id === action.id);
              i = comments.indexOf(comment);
              return {
                  ...state,
                 [action.postid]:[...comments.slice(0,i), ...comments.slice(i+1)]
              };
          default: return state;
      }
  }

