import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import BackButton from './BackButton'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import PostVoteControl from './PostVoteControl'
import { formatDate } from '../Util/helper'
import { deletePostAction, getPosts } from '../Actions/Post'
import { getComments } from '../Actions/Comment'
import * as swal from 'sweetalert'

class PostDetails extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        if(!this.props.post){
            this.props.dispatch(getPosts())
                .then(posts => {
                    let post = posts.find(p => p.id === id);
                    if(!post) {
                        this.props.history.push("/");
                        swal("Oops!", "Unknown post or the post has been deleted", "warning");
                    }
                    if(post) this.props.dispatch(getComments(post.id));
                });
        }
        if(!this.props.comments && this.props.post)
            this.props.dispatch(getComments(this.props.post.id));
    }


    goBack(){
        this.props.history.push("/");
    }

    deletePost(id){
        this.props.dispatch(deletePostAction(id))
            .then(res => {
                  swal("Success","This post has been deleted.", "success");
                  this.props.history.push("/");
            });
    }

    render(){
        const { post, comments} = this.props;
        return post ? (
            <div className="post-details">
                <h2>{post.title} <Link to={"/posts/edit/"+post.id}><i className='glyphicon glyphicon-pencil' data-tip="Edit this post"></i></Link>
                </h2>
                <h3><span className='label label-info'>{post.category}</span></h3>
                <p>By <strong>{post.author}</strong> at {formatDate(post.timestamp)}</p>
                <div className="post-body">
                    {post.body}
                </div>
               <PostVoteControl post={post}/>
                <CommentForm postid={post.id}/>

                <CommentList postid={post.id}/>
                <p className="pull-right">
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePost(post.id)}>Delete this Post</button>
                </p>
                  <ReactTooltip />

                <p>
                  <button className='btn btn-default backBtn' onClick={() => this.goBack()}>
                    <i className='glyphicon glyphicon-arrow-left'></i> Back</button>
                </p>
            </div>
        ):<div></div>
    }
}



function mapStateToProps({ posts, comments }, ownProps){
    const { id } = ownProps.match.params;
    const post = posts.find(p => p.id === id);

    return { post, comments: comments[id] };
}

export default connect(mapStateToProps)(PostDetails);
