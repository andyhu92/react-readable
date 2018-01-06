import { combineReducers } from 'redux'
import categories from './Category'
import posts from './Post'
import comments from './Comment/'



export default combineReducers({
  categories,
  posts,
  comments
})