import { getCommentsByPost, upvoteComment, downvoteComment, deleteComment, addComment, editComment } from '../../Util/api'
import {
    FETCH_COMMENTS,
    ADD_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT} from '../types'


    export function getComments(postid){
         return function(dispatch){
            return getCommentsByPost(postid)
                        .then(comments => dispatch({
                            type: FETCH_COMMENTS,
                            comments,
                            postid
                        }));
        }
    }

    export function addCommentAction(comment, postid){
         comment.parentId = postid;
         return function(dispatch){
            return addComment(comment)
                        .then(res => {
                            dispatch({
                            type: ADD_COMMENT,
                            comment:res,
                            postid
                        })
                        });
        }
    }

    export function editCommentAction(comment){
         return function(dispatch){
            return editComment(comment)
                        .then(res => {
                            dispatch({
                            type: EDIT_COMMENT,
                            comment:res,
                            postid: comment.parentId
                        })
                        });
        }
    }

    export function upvoteCommentAction(id, postid) {
        return function(dispatch){
            return upvoteComment(id)
                        .then(res => dispatch({
                            type: UPVOTE_COMMENT,
                            id,
                            postid
                        }));
        }
    }

    export function downvoteCommentAction(id, postid) {
        return function(dispatch){
            return downvoteComment (id)
                        .then(res => dispatch({
                            type: DOWNVOTE_COMMENT,
                            id,
                            postid
                        }));
        }
    }

    export function deleteCommentAction(id, postid) {
        return function(dispatch){
            return deleteComment(id)
                    .then(res => {
                        dispatch({
                            type: DELETE_COMMENT,
                            id,
                            postid
                        })
                        return res;
                    });
        }
    }
