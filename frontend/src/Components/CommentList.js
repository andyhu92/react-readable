import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import {formatDate } from '../Util/helper'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'
import Pencil from 'react-icons/lib/fa/pencil-square'
import Trash from 'react-icons/lib/fa/trash-o'
import * as commentActions from '../Actions/Comment'
import { upvoteCommentAction, downvoteCommentAction, deleteCommentAction, editCommentAction} from '../Actions/Comment'
class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            editCommentModalOpen:false,
            currentComment:null,
            editCommentValue:""
        }
    }
    openEditModal(comment){
        this.setState({
            editCommentModalOpen:true,
            currentComment:comment,
            editCommentValue: comment.body
        })

    }

    closeEditModal(){
        this.setState({
            editCommentModalOpen:false
        })
    }

    upVoteComment(id){
        const {  postid } = this.props;
        this.props.dispatch(upvoteCommentAction(id,postid));
    }

    downVoteComment(id){
        const {  postid } = this.props;
        this.props.dispatch(downvoteCommentAction(id,postid));
    }

    deleteComment(id){
        const {  postid } = this.props;
        this.props.dispatch(deleteCommentAction(id,postid));
    }

    handleChange(e){
        this.setState({
            editCommentValue:e.target.value
        })
    }

    editComment(){
        let { currentComment, editCommentValue } = this.state;
        currentComment.body = editCommentValue;
        currentComment.timestamp = Date.now();
        this.props.dispatch(editCommentAction(currentComment));
         this.setState({
            editCommentModalOpen:false,
            currentComment:null,
            editCommentValue:""
        })
    }

    render(){
        console.log(this.props);
        const { comments, postid } = this.props;
        const { editCommentModalOpen } = this.state;
        if(!comments) return (<div></div>);
            return comments.length > 0 ? (
                <div className="comment-list">

                <ReactModal
                isOpen={this.state.editCommentModalOpen}
                onRequestClose={this.closeCommentModal}
                contentLabel='Modal'
                >
                    <div className="form-group">
                        <input className="form-control"
                        value={this.state.editCommentValue} onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.editComment()}>Save Change</button>
                        <button type="button" className="btn btn-default" onClick={() => this.closeEditModal()}>Cancel</button>
                    </div>
                </ReactModal>

                    {comments.map(c => (
                        <div className="comment" key={c.id}>
                            <p><strong>{c.author}: </strong> {c.body}</p>
                            <p className="time">{formatDate(c.timestamp)}
                                <span className="pull-right">
                                    <ThumbsUp onClick={() => this.upVoteComment(c.id)}/> {c.voteScore} <ThumbsDown onClick={() => this.downVoteComment(c.id)}/>
                                        <Pencil className="pencil-icon" onClick={() => this.openEditModal(c)}/>
                                        <Trash className="trash-icon" onClick={() => this.deleteComment(c.id)}/>
                                </span>
                            </p>

                        </div>
                    ))}


                </div>) : <div></div>
    }

}

function mapStateToProps({ comments }, ownProps){
    return { comments: comments[ownProps.postid]};

}

export default connect(mapStateToProps, commentActions)(CommentList);
