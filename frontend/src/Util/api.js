const baseUrl = process.env.REACT_APP_BACKEND;
const params = { headers: { 'Authorization': 'test', 'Content-Type':'application/json' }};

export function fetchCategories(){
 	return fetch(baseUrl + "categories", params)
  				.then(res => {
      return res.json()
    });
}

export function fetchPosts(){
 	return fetch(baseUrl + "posts", params)
  				.then(res => {
      return res.json()
    });
}

export function fetchPostDetails(id){
 	return fetch(`${baseUrl}posts/${id}`, params)
  				.then(res => {
      return res.json()
    });
}

export function updatePost(post){
 	return fetch(`${baseUrl}posts/${post.id}`,{...params, method: "PUT", body : JSON.stringify(post)})
  				.then(res => {
      return res.json()
    });
}

export function addNewPost(post){
 	return fetch(baseUrl + "posts", {...params, method: "POST", body : JSON.stringify(post)})
  				.then(res => {
      return res.json()
    });
}

export function deletePost(id){
 	return fetch(`${baseUrl}posts/${id}`, {...params, method: "DELETE" })
  				.then(res => {
      return res.json()
    });
}

export function upvotePost(id){
 	return fetch(`${baseUrl}posts/${id}`, {...params, method: "POST", body : JSON.stringify({option:"upVote"})})
  				.then(res => {
      return res.json()
    });
}

export function downvotePost(id){
 	return fetch(`${baseUrl}posts/${id}`, {...params, method: "POST", body : JSON.stringify({option:"downVote"})})
  				.then(res => {
      return res.json()
    });
}

export function fetchPostsByCategory(category){
 	return fetch(`${baseUrl}${category}/posts`, params)
  				.then(res => {
      return res.json()
    });
}

export function getCommentsByPost(id){
  return fetch(`${baseUrl}posts/${id}/comments`, params)
          .then(res => {
            return res.json()
        });
}

export function addComment(comment){
 	return fetch(`${baseUrl}comments`, {...params, method: "POST", body : JSON.stringify(comment)})
  				.then(res => {
      return res.json()
    });
}

export function editComment(comment){
 	return fetch(`${baseUrl}comments/${comment.id}`, {...params, method: "PUT", body : JSON.stringify({body:comment.body, timestamp: comment.timestamp})})
  				.then(res => {
      return res.json()
    });
}

export function upvoteComment(id){
 	return fetch(`${baseUrl}comments/${id}`, {...params, method: "POST", body : JSON.stringify({option:"upVote"})})
  				.then(res => {
      return res.json()
    });
}

export function downvoteComment(id){
 	return fetch(`${baseUrl}comments/${id}`, {...params, method: "POST", body : JSON.stringify({option:"downVote"})})
  				.then(res => {
      return res.json()
    });
}

export function deleteComment(id){
 	return fetch(`${baseUrl}comments/${id}`, {...params, method: "DELETE"})
  				.then(res => {
      return res.json()
    });
}

