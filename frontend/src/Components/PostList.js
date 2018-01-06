import React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import SortControl from './SortControl'
import PostVoteControl from './PostVoteControl'
import { formatDate } from '../Util/helper'
import FaComment from 'react-icons/lib/fa/commenting-o'
import Trash from 'react-icons/lib/fa/trash-o'
import { deletePostAction } from '../Actions/Post'
import * as swal from 'sweetalert'

class PostList extends React.Component{
    constructor(){
        super();
        this.state = {
            sortInfo:{
                sortBy:"voteScore",
                order:"desc"
            }
        }
    }
  handleSort = (value) => {
      this.setState({
          sortInfo: value
      });
  }

  deletePost(id){
        this.props.dispatch(deletePostAction(id))
            .then(res => {
                  swal("Success","This post has been deleted.", "success");
            });
    }

  render(){
    let { posts, category } = this.props;
    const { sortInfo } = this.state;
    posts = posts ? posts.sort((a,b) => {
        return sortInfo.order === "asc" ? a[sortInfo.sortBy] - b[sortInfo.sortBy]
        :b[sortInfo.sortBy] - a[sortInfo.sortBy]
    }):[];

    if(category) posts = posts.filter(p => p.category === category);

    return (


        <div className="post-list-container">
            <SortControl onSort={this.handleSort}/>
            <ul className="list-group post-list">
                { posts.map((post) =>
                    <li key={post.id} className="list-group-item">
                    <ReactTooltip />
                    <h4><Link to={`/${post.category}/${post.id}`}>{post.title} </Link> <Link to={"/posts/edit/"+post.id}><i className='glyphicon glyphicon-pencil' data-tip="Edit this post"></i></Link>

                    <button className="pull-right btn btn-danger"  type="button" onClick={() => this.deletePost(post.id)}><Trash/> Delete</button>
                    <Link to={"/"+post.category}><span className="label label-info">{post.category}</span></Link>

                    <div className="inline-block">
                     <PostVoteControl post={post}/>
                    </div>
                    </h4>
                    <p>Posted by <strong>{post.author}</strong> at {formatDate(post.timestamp)}
                        <span className="pull-right"><FaComment/> {post.comments}</span>
                    </p>

                </li>
                )}

                {posts.length === 0 && <li className="list-group-item">No post in this category</li>}
            </ul>
        </div>

    );
  }
}

function mapStateToProps({ categories, posts, comments }){
      return { posts: posts.filter(p => !p.deleted).map(p => ({
            ...p,
            comments:comments[p.id] ? comments[p.id].length : 0
        })) , categories};
}

export default connect(mapStateToProps)(PostList);
