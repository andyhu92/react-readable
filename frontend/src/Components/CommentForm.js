import React, { Component } from 'react'
import { connect } from 'react-redux'
import BackButton from './BackButton'
import * as swal from 'sweetalert'
import uuidv1 from 'uuid/v1'
import { addCommentAction } from '../Actions/Comment'

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            author:"",
            body:"",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.authorInput.focus();
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

        const { postid } = this.props;

        if(isValid){
            let newComment = {
                ...this.state,
                id: uuidv1(),
                parentid:postid,
                timestamp: Date.now()
            };

            this.props.dispatch(addCommentAction(newComment,postid))
                .then(() => {
                    this.setState({
                         author:"",
                         body:""
                    })
                    // swal("Success","New Post Added Successfully!", "success");
                    // this.props.history.push("/");
                });
            }
        }

    render(){
        return (
            <form className="post-form" onSubmit={this.handleSubmit}>
                <h2>New Comment</h2>

                <div className="form-group required">
                    <label htmlFor="author">
                        Author
                    </label>
                    <input className="form-control" name="author" id="author" ref={(input) => { this.authorInput = input; }}
                     value={this.state.author} onChange={this.handleInputChange} />
                </div>

                <div className="form-group required">
                    <label htmlFor="body">
                        Comment
                    </label>
                    <textarea className="form-control" name="body" id="body"
                     value={this.state.body} onChange={this.handleInputChange} ></textarea>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary submit">Submit Comment</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ categories ,posts}, ownProps){
    let post = {};
    return {categories, post };
}

export default connect()(CommentForm);
