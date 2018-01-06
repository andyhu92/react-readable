import React from 'react'
import { Route, Link } from 'react-router-dom'
import { getPosts } from '../Actions/Post'


class CategoryList extends React.Component{
  render(){
    let { categories, category } = this.props;
    categories = categories || [];
      return (
        <ul className="nav nav-tabs">
          <li className={!category ? "active":""}>
            <Link to="/">All</Link>
          </li>
        { categories.map((c) =>
          <li key={c.name} className={category === c.path ? "active":""}>
            <Link to={"/"+c.path}>{c.name}</Link>
          </li>
        )}
        </ul>
      );
  }

}


export default CategoryList
