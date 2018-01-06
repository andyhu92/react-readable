import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoryList from './CategoryList'
import PostList from './PostList'
import { getPosts } from '../Actions/Post'
import { getCategories } from '../Actions/Category'
import { getComments } from '../Actions/Comment'

class CategoryPosts extends Component{
    componentDidMount() {
        this.props.categories.length === 0 ? this.props.dispatch(getCategories()) :"";
        this.props.dispatch(getPosts()).then(posts => {
          if(!this.props.comments) posts.forEach(p => this.props.dispatch(getComments(p.id)));
        });
    }

    render(){
        const { category } = this.props.match.params;
        let { categories } = this.props;

        return (
        <div>
            <CategoryList categories={categories} category={category}/>
            <h2>All Posts
                <Link className="btn btn-info add-post-btn" to="/posts/add/newPost">
                <i className="glyphicon glyphicon-plus"></i> New Post</Link>
            </h2>
            <div className="posts">
                <PostList category={category}/>
            </div>
        </div>);
    }
}

function mapStateToProps({ categories, posts, comments }){
    return { posts: posts.filter(p => !p.deleted) , categories};
}

export default connect(mapStateToProps)(CategoryPosts);
