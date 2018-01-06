import {
  FETCH_CATEGORIES
} from '../../Actions/types'

export default function categories(state=[], action){
    switch(action.type){
        case FETCH_CATEGORIES:
            return action.categories;
        default: return state;
    }
}