import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackButton from './BackButton'
import * as swal from 'sweetalert'
import uuidv1 from 'uuid/v1'
import { addPost, editPost } from '../Actions/Post/'

class PostForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            author:"",
            title:"",
            body:"",
            category:""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.authorInput.focus();
        this.setState({
            author:this.props.post.author,
            title:this.props.post.title,
            body:this.props.post.body,
            category:this.props.post.category
        })
    }

    validateForm(){
        let arr = [];
        for(let prop in this.state){
            if(!this.state[prop]) arr.push(prop[0].toUpperCase() + prop.slice(1));
        }
        if(arr.length > 0){
            swal("Missing Information",arr.join(', ') + ' is required',"error");
            return false;
        }
        return true;
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let isValid = this.validateForm();

        const { isUpdate, post } = this.props;

        if(isValid){
            if(isUpdate){
                let updatedPost = {
                    ...post,
                    ...this.state,
                 };

                this.props.dispatch(editPost(updatedPost))
                    .then(() => {
                        swal("Success","Post Updated Successfully!", "success");
                        this.props.history.push(`/${updatedPost.category}/${updatedPost.id}`);
                    });
            }
            else{
                let newPost = {
                    ...this.state,
                    id: uuidv1(),
                    timestamp: Date.now()
                };

                this.props.dispatch(addPost(newPost))
                    .then(() => {
                        swal("Success","New Post Added Successfully!", "success");
                        this.props.history.push("/");
                    });
                }
             }
    }

    render(){
        const { categories, isUpdate } = this.props;
        return (
            <form className="post-form" onSubmit={this.handleSubmit}>
                <h2>{isUpdate ? 'Edit':'New'} Post</h2>

                <div className="form-group required">
                    <label htmlFor="author">
                        Author
                    </label>
                    <input className="form-control" name="author" id="author" ref={(input) => { this.authorInput = input; }}
                     disabled={isUpdate} value={this.state.author} onChange={this.handleInputChange} />
                </div>

                <div className="form-group required">
                    <label htmlFor="title">
                        Title
                    </label>
                    <input className="form-control" name="title" id="title"
                     value={this.state.title} onChange={this.handleInputChange} />
                </div>

                <div className="form-group required">
                    <label htmlFor="body">
                        Body
                    </label>
                    <textarea className="form-control" rows="5" name="body" id="body"
                     value={this.state.body} onChange={this.handleInputChange} ></textarea>
                </div>

                <div className="form-group required">
                    <label htmlFor="category">
                        Category
                    </label>
                    <select className="form-control" id="category" name="category" disabled={isUpdate}
                        value={this.state.category} onChange={this.handleInputChange}>
                        <option value="">-- Select a Category --</option>
                        {categories.map(c => (
                            <option value={c.name} key={c.path}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary submit">Submit</button>

                    <BackButton/>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ categories ,posts}, ownProps){
    const { id } = ownProps.match.params;
    let isUpdate = !!id;
    let post = {};
    if(isUpdate) post = posts.find(p => p.id === id);
    return {categories, isUpdate, post };
}

export default connect(mapStateToProps)(PostForm);
