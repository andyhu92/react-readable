import { fetchCategories } from '../../Util/api'


import { FETCH_CATEGORIES } from '../types'


export function getCategories () {
    return function(dispatch){
        return fetchCategories()
                    .then(data => dispatch({
                        type: FETCH_CATEGORIES,
                        categories: data.categories
                    }));
    }
}
