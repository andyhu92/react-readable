import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upvotePostAction, downvotePostAction } from '../Actions/Post'
import ThumbsUp from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-o-down'

class PostVoteControl extends Component{

    upVote(id){
        this.props.dispatch(upvotePostAction(id));
    }

    downVote(id){
        this.props.dispatch(downvotePostAction(id));
    }

    render(){
        const { post } = this.props;
        return (
              <div className="vote-control">
                    <button className='btn btn-default' onClick={() => this.upVote(post.id)}><ThumbsUp/></button>
                    <span className="score"> Vote: {post.voteScore}</span>
                    <button className='btn btn-default' onClick={() => this.downVote(post.id)}><ThumbsDown/></button>
              </div>
        )
    }
}

export default connect()(PostVoteControl);